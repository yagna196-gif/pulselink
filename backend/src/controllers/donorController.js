const { User, Donor } = require('../models');
const { getDonorByUserId, getDonorsByBloodGroup } = require('../utils/queries');

const createDonor = async (req, res) => {
  try {
    const { name, email, phone, password, address, city, state, bloodGroup } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      passwordHash: password,
      role: 'DONOR',
      address,
      city,
      state,
      bloodGroup,
    });

    // Create donor record
    const donor = await Donor.create({
      userId: user.id,
      totalDonations: 0,
    });

    res.status(201).json({
      message: 'Donor registered successfully',
      donor: {
        id: donor.id,
        userId: user.id,
        name: user.name,
        bloodGroup: user.bloodGroup,
      },
    });
  } catch (error) {
    console.error('Create donor error:', error);
    res.status(500).json({ error: 'Failed to create donor' });
  }
};

const getDonors = async (req, res) => {
  try {
    const { bloodGroup, isAvailable = true, limit = 10, offset = 0 } = req.query;
    const where = { isAvailable: isAvailable === 'true' };

    const donors = await Donor.findAll({
      where,
      include: {
        model: User,
        as: 'user',
        where: bloodGroup ? { bloodGroup } : undefined,
        attributes: ['id', 'name', 'phone', 'address', 'bloodGroup'],
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const total = await Donor.count({ where });

    res.json({ donors, total });
  } catch (error) {
    console.error('Get donors error:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
};

const getDonorById = async (req, res) => {
  try {
    const { id } = req.params;

    const donor = await Donor.findByPk(id, {
      include: { model: User, as: 'user' },
    });

    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json(donor);
  } catch (error) {
    console.error('Get donor error:', error);
    res.status(500).json({ error: 'Failed to fetch donor' });
  }
};

const updateDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const { lastDonationDate, totalDonations, medicalConditions, isAvailable } = req.body;

    const donor = await Donor.findByPk(id);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    // Calculate next eligible date (after 56 days from last donation)
    let nextEligibleDate = null;
    if (lastDonationDate) {
      nextEligibleDate = new Date(lastDonationDate);
      nextEligibleDate.setDate(nextEligibleDate.getDate() + 56);
    }

    await donor.update({
      lastDonationDate,
      totalDonations,
      medicalConditions,
      isAvailable,
      nextEligibleDate,
    });

    res.json({
      message: 'Donor updated successfully',
      donor: {
        id: donor.id,
        lastDonationDate: donor.lastDonationDate,
        nextEligibleDate: donor.nextEligibleDate,
      },
    });
  } catch (error) {
    console.error('Update donor error:', error);
    res.status(500).json({ error: 'Failed to update donor' });
  }
};

const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;

    const donor = await Donor.findByPk(id);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    // Deactivate user instead of deleting
    await User.update({ isActive: false }, { where: { id: donor.userId } });
    await donor.update({ isAvailable: false });

    res.json({ message: 'Donor deactivated' });
  } catch (error) {
    console.error('Delete donor error:', error);
    res.status(500).json({ error: 'Failed to delete donor' });
  }
};

module.exports = {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
};
