"use strict";
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password_hash: {
        type: DataTypes.STRING
      },
      password: DataTypes.VIRTUAL
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };

  User.login = function (email, password) {
    return User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (!user) return null;
      return user
        .authenticatePassword(password)
        .then((valid) => (valid ? user : null));
    });
  };

  User.prototype.authenticatePassword = function (password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password_hash, function (err, valid) {
        if (err) return rej(err);
        res(valid);
      });
    });
  };

  User.beforeCreate(function (user, options) {
    console.log("vallllllllll." + user.password);
    return new Promise((res, rej) => {
      if (user.password) {
        bcrypt.hash(user.password, 10, function (error, hash) {
          user.password_hash = hash;
          res();
        });
      }
    });
  });

  return User;
};
