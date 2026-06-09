const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BloodRequest = require('./BloodRequest');
const Donor = require('./Donor');

const RequestResponse = sequelize.define('RequestResponse', {
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
  donorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Donor,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('ACCEPTED', 'DECLINED', 'PENDING'),
    defaultValue: 'PENDING',
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  respondedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  donationCompletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'request_responses',
});

// Associations
RequestResponse.belongsTo(BloodRequest, { foreignKey: 'requestId', as: 'request' });
RequestResponse.belongsTo(Donor, { foreignKey: 'donorId', as: 'donor' });

module.exports = RequestResponse;
