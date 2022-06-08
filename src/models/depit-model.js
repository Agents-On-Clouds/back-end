const DepitModel = (sequelize, DataTypes) => {
       const Depit = sequelize.define('Depit', {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              userId: {
                     type: DataTypes.INTEGER,
                     allowNull: false,
              },
              amount: {
                     type: DataTypes.INTEGER,
                     allowNull: false,
              },
              description: {
                     type: DataTypes.STRING,
                     allowNull: false,
              },
              date: {
                     type: DataTypes.STRING,
              }
       })


       Depit.beforeCreate(async Depit => {
              let currentdate = new Date();
              let datetime = (currentdate.toDateString()).split(' ')[0] + "  " + currentdate.getDate() + "/" + (currentdate.toLocaleDateString()).split('/')[0] + "/" + currentdate.getFullYear() + "  "
                     + currentdate.toLocaleTimeString();
              if (!Depit.date) {
                     Depit.date = datetime;
              }
       })
       return Depit;
}

module.exports = DepitModel;