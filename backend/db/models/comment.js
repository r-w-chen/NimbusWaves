'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey: 'userId'});
    Comment.belongsTo(models.Song, {foreignKey: 'songId'});
  };
  return Comment;
};