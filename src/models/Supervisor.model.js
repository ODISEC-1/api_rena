const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/bdCon");


const supervisorTable = sequelize.define('supervisorTable',
    {
      id_Super:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
      DNI:{type:DataTypes.STRING(9)},
      Nombre_Super:{type:DataTypes.STRING(100)}
    },
    {
      tableName: 'Tb_Supervisor',
      timestamps:false
    }
) 


module.exports = {supervisorTable} ;