'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const replyBody = require('../routes/common/replyBody');
require('dotenv').config();

const UserModel = (sequelize, DataTypes) => {
       const Users = sequelize.define('User', {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              userName: {
                     type: DataTypes.STRING,
                     allowNull: false,
              },
              password: {
                     type: DataTypes.STRING,
                     allowNull: false,
              },
              token: {
                     type: DataTypes.VIRTUAL,
                     get() {
                            return jwt.sign({ id: this.id, userName: this.userName }, process.env.JWT_SECRET || 'MYSUPERSECRET');
                     },

                     set(tokenObject) {
                            let token = jwt.sign(tokenObject, process.env.JWT_SECRET || 'MYSUPERSECRET');
                            return token;
                     }
              }
       })


       Users.beforeCreate(async User => {
            await  Users.findOne({ where:  { userName: User.userName } })
                     .then(user => {
                            if(user) {
                                   throw (replyBody.error("USER_REGISTERATION_FAILD" , "UserName already used"));
                            } else {
                                   User.password = bcrypt.hashSync(User.dataValues.password, 10);
                            }
                     })
                     .catch(err => {
                            console.log(err);
                            if(errorList[err.errorCode]) {
                                   throw (replyBody.error(err.errorCode, err.message));
                            }
                            throw (replyBody.error("USER_REGISTERATION_ERROR" , "Error while registering user"));
                     })
       });

       Users.authenticateBasic = (userName, password) => {
              return  Users.findOne({ where: { userName } })
                     .then(async (User) => {

                            if (User && await bcrypt.compare(password, Users.password)) {
                                   return User;
                            }
                            else {
                                   throw (replyBody.error("LOGIN_FAILED" , "Invalid username or password"));
                            }
                     });
       };

       Users.authenticateToken = (token) => {
              return jwt.verify(token, process.env.JWT_SECRET || "MYSUPERSECRET", (err, decoded) => {
                  if (err) {
                         throw (replyBody.error("LOGIN_FAILED_INVALID_TOKEN" , "Invalid token"));
                  } else {
                      return decoded;
                  }
              });
          };

       return Users;
}


const errorList = {
       "USER_REGISTERATION_FAILD" : 409,
}

module.exports = UserModel;