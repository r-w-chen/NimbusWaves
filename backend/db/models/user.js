'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    profileImgURL: {
      type: DataTypes.STRING(1000),
    },
    coverImgURL: {
      type: DataTypes.STRING(1000),
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    User.hasMany(models.Song, {foreignKey: 'userId'});
    User.hasMany(models.Comment, {foreignKey: 'userId'});
    User.hasMany(models.Follow, {foreignKey: 'followerId', as: 'follower'});
    User.hasMany(models.Follow, {foreignKey: 'userFollowedId', as: 'userFollowed'});
    User.hasMany(models.Like, {foreignKey: 'userId'});
  };
  //****** USER INSTANCE METHODS  *********/
  //return an obj with User instance infor that is safe to save to a JWT
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  //returns a boolean that tells if there is a match with the User instance's hashedPassword
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

  //****STATIC USER METHODS  ********/
  //returns User info, scoped to currentUser (includes everything but hashedPassword)
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

  // Find user by email or username - if found, then validate user PW - if successful, return information on logged-in User
  User.login = async function ({ credential, password }) {
  const { Op } = require('sequelize');
  const user = await User.scope('loginUser').findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });
  if (user && user.validatePassword(password)) {
    return await User.scope('currentUser').findByPk(user.id);
  }
};

User.signup = async function ({ username, email, password }) {
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    username,
    email,
    hashedPassword,
  });
  return await User.scope('currentUser').findByPk(user.id);
};
  return User;
};