'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    audioURL: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    genre: DataTypes.STRING(30),
    songImgURL: {
      type: DataTypes.STRING(1000)
    },
    description: {
      type: DataTypes.TEXT
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: 'userId'});
    Song.hasMany(models.Comment, {foreignKey: 'songId'});
    Song.hasMany(models.Like, {foreignKey: 'songId'});
  };
  return Song;
};