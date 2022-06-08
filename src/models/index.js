'use strict';

require('dotenv').config();
const {Sequelize , DataTypes} = require('sequelize');

const SQL_DATABASE = SQL_DATABASE_URL ||  "postgres://zkrjcgxw:pspNX9zaBqzhyjpqJFY5Wt54BMYN-in_@castor.db.elephantsql.com/zkrjcgxw";
const sequelize = new Sequelize(SQL_DATABASE, {
       dialect: 'postgres',
       logging: false,
       define: {
                 timestamps: false,
                       freezeTableName: true,
                       },
});

// Export the Models 
const userModel = require('./user-model');
const depitModel = require('./depit-model');


const Users = userModel(sequelize, DataTypes);
const Depits = depitModel(sequelize, DataTypes);


Depits.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Depits, { foreignKey: 'userId' });




module.exports = {
       db : sequelize,
       Users : Users,
       Depits : Depits,
}