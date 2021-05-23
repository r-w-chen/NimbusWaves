'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    songId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User , {foreignKey: 'userId'});
    Like.belongsTo(models.Song , {foreignKey: 'songId'});
  };
  return Like;
};