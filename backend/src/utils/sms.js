const twilioClient = require('../config/twilio');
const { SmsLog } = require('../models');

const sendSMS = async (phoneNumber, message, requestId = null) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    // Log the SMS
    if (requestId) {
      await SmsLog.create({
        requestId,
        phoneNumber,
        messageContent: message,
        status: 'SENT',
        twilioMessageId: response.sid,
      });
    }

    return { success: true, messageId: response.sid };
  } catch (error) {
    console.error('SMS send error:', error);

    // Log the failure
    if (requestId) {
      await SmsLog.create({
        requestId,
        phoneNumber,
        messageContent: message,
        status: 'FAILED',
        errorMessage: error.message,
      });
    }

    return { success: false, error: error.message };
  }
};

const broadcastRequestTodonors = async (request, donors) => {
  const message = `
🩸 PULSELINK URGENT
Blood needed: ${request.bloodGroup}
Patient: ${request.patient.name}
Location: ${request.patient.address}
Priority: ${request.priority}
Hospital: ${request.hospitalName}
Units needed: ${request.quantityNeeded}
Reply: ACCEPT ${request.id} or visit app
Contact: ${request.patient.phone}
  `.trim();

  const promises = donors.map((donor) =>
    sendSMS(donor.user.phone, message, request.id)
  );

  return Promise.all(promises);
};

module.exports = {
  sendSMS,
  broadcastRequestTodonors,
};
