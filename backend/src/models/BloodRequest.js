const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const BloodRequest = sequelize.define('BloodRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  bloodGroup: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: false,
  },
  quantityNeeded: {
    type: DataTypes.INTEGER, // in units/bags
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('CRITICAL', 'HIGH', 'NORMAL'),
    defaultValue: 'NORMAL',
  },
  hospitalName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hospitalAddress: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  hospitalPhone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('CREATED', 'SMS_SENT', 'ACCEPTED', 'COMPLETED', 'CANCELLED'),
    defaultValue: 'CREATED',
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  acceptedDonorId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'blood_requests',
});

// Association
BloodRequest.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

module.exports = BloodRequest;
