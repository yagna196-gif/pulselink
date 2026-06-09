const { User, Donor } = require('../models');

const getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const getDonorByUserId = async (userId) => {
  return Donor.findOne({
    where: { userId },
    include: { model: User, as: 'user' },
  });
};

const getDonorsByBloodGroup = async (bloodGroup) => {
  return Donor.findAll({
    include: {
      model: User,
      as: 'user',
      where: { bloodGroup, isActive: true },
    },
    where: { isAvailable: true },
  });
};

module.exports = {
  getUserByEmail,
  getUserById,
  getDonorByUserId,
  getDonorsByBloodGroup,
};
