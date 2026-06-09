const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Donor = sequelize.define('Donor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  lastDonationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  totalDonations: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  medicalConditions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  nextEligibleDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'donors',
});

// Association
Donor.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Donor;
