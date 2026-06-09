const { SmsLog } = require('../models');

const getSmsLogs = async (req, res) => {
  try {
    const { requestId, status, limit = 10, offset = 0 } = req.query;
    const where = {};

    if (requestId) where.requestId = requestId;
    if (status) where.status = status;

    const logs = await SmsLog.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    const total = await SmsLog.count({ where });

    res.json({ logs, total });
  } catch (error) {
    console.error('Get SMS logs error:', error);
    res.status(500).json({ error: 'Failed to fetch SMS logs' });
  }
};

module.exports = {
  getSmsLogs,
};
