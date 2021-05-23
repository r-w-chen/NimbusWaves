'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userFollowedId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, {foreignKey: 'followerId', as: 'follower'})
    Follow.belongsTo(models.User, {foreignKey: 'userFollowedId', as: 'userFollowed'})
  };
  return Follow;
};