const { User, Donor, BloodRequest, RequestResponse } = require('../models');
const { getDonorsByBloodGroup } = require('../utils/queries');
const { sendSMS, broadcastRequestTodonors } = require('../utils/sms');

const createRequest = async (req, res) => {
  try {
    const { bloodGroup, quantityNeeded, priority, hospitalName, hospitalAddress, hospitalPhone, notes } = req.body;
    const patientId = req.user.id;

    // Validate input
    if (!bloodGroup || !quantityNeeded || !hospitalName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get patient details
    const patient = await User.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Create blood request
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expire in 7 days

    const request = await BloodRequest.create({
      patientId,
      bloodGroup,
      quantityNeeded,
      priority: priority || 'NORMAL',
      hospitalName,
      hospitalAddress,
      hospitalPhone,
      notes,
      status: 'CREATED',
      expiresAt,
    });

    // Load patient details
    request.patient = patient;

    // Get matching donors
    const donors = await getDonorsByBloodGroup(bloodGroup);

    if (donors.length > 0) {
      // Update status to SMS_SENT
      await request.update({ status: 'SMS_SENT' });

      // Broadcast SMS to donors
      await broadcastRequestTodonors(request, donors);

      return res.status(201).json({
        message: `Blood request created and SMS sent to ${donors.length} matching donors`,
        request: {
          id: request.id,
          bloodGroup: request.bloodGroup,
          quantityNeeded: request.quantityNeeded,
          status: request.status,
          donorCount: donors.length,
        },
      });
    } else {
      return res.status(201).json({
        message: 'Blood request created but no matching donors available',
        request: {
          id: request.id,
          bloodGroup: request.bloodGroup,
          status: request.status,
          donorCount: 0,
        },
      });
    }
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
};

const getRequests = async (req, res) => {
  try {
    const { status, bloodGroup, limit = 10, offset = 0 } = req.query;
    const where = {};

    if (status) where.status = status;
    if (bloodGroup) where.bloodGroup = bloodGroup;

    const requests = await BloodRequest.findAll({
      where,
      include: { model: User, as: 'patient', attributes: ['id', 'name', 'phone'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    const total = await BloodRequest.count({ where });

    res.json({ requests, total });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await BloodRequest.findByPk(id, {
      include: [
        { model: User, as: 'patient', attributes: ['id', 'name', 'phone', 'address'] },
      ],
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error('Get request error:', error);
    res.status(500).json({ error: 'Failed to fetch request' });
  }
};

const respondToRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const { status, reason } = req.body;
    const donorId = req.user.id; // Actually donor's user ID

    // Get donor record
    const donor = await Donor.findOne({ where: { userId: donorId } });
    if (!donor) {
      return res.status(404).json({ error: 'Donor profile not found' });
    }

    // Create response
    const response = await RequestResponse.create({
      requestId,
      donorId: donor.id,
      status,
      reason,
      respondedAt: new Date(),
    });

    // If accepted, update request status
    if (status === 'ACCEPTED') {
      await BloodRequest.update(
        { status: 'ACCEPTED', acceptedDonorId: donor.id },
        { where: { id: requestId } }
      );

      // Notify patient
      const request = await BloodRequest.findByPk(requestId, {
        include: { model: User, as: 'patient' },
      });

      const donorUser = await User.findByPk(donorId);
      const notificationSMS = `✅ Donor found! ${donorUser.name} will contact you. Phone: ${donorUser.phone}`;
      await sendSMS(request.patient.phone, notificationSMS);
    }

    res.status(201).json({
      message: 'Response recorded',
      response: {
        id: response.id,
        status: response.status,
      },
    });
  } catch (error) {
    console.error('Respond to request error:', error);
    res.status(500).json({ error: 'Failed to respond to request' });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await BloodRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    await request.update({ status });

    res.json({
      message: 'Request status updated',
      request: { id: request.id, status: request.status },
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({ error: 'Failed to update request' });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  respondToRequest,
  updateRequestStatus,
};
