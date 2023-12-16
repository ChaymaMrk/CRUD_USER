const { DataTypes } = require('sequelize');

const User = (sequelize) => {
  const UserModel = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.INTEGER, // Changed to number type
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE, // Date type for birthday
      allowNull: false
    }
  });

  return UserModel;
};

module.exports = User;
