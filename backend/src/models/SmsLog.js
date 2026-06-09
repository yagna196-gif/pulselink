const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BloodRequest = require('./BloodRequest');

const SmsLog = sequelize.define('SmsLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  requestId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: BloodRequest,
      key: 'id',
    },
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  messageContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('SENT', 'FAILED', 'DELIVERED'),
    defaultValue: 'SENT',
  },
  twilioMessageId: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  errorMessage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'sms_logs',
});

// Association
SmsLog.belongsTo(BloodRequest, { foreignKey: 'requestId', as: 'request' });

module.exports = SmsLog;
