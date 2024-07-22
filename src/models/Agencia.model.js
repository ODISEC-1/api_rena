const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/bdCon");



const Tabla_Agencia = sequelize.define('Tabla_Agencia',
    {
      Id_Agencia:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
      Agencia:{type:DataTypes.STRING(100)},
      Canal:{type:DataTypes.STRING(50)},
      Zona_Plaza:{type:DataTypes.STRING(50)}
    },
    {
     tableName:'Tb_Agencia',
     timestamps:false
    }

)

module.exports = {Tabla_Agencia};

