'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    accceptsCreditCard: DataTypes.BOOLEAN,
    coverImage: DataTypes.TEXT,
    avatarImage: DataTypes.TEXT,
    openHour: DataTypes.INTEGER,
    closeHour: DataTypes.INTEGER
  }, {});
  Place.associate = function(models) {
    // associations can be defined here
  };
  return Place;
};