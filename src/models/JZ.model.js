const { sequelize } = require("../config/bdCon");
const {DataTypes} = require('sequelize')



const JZtable = sequelize.define('JZtable',
    {
        id_JZ:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        DNI:{type:DataTypes.STRING(9)},
        Nombre_JZ:{type:DataTypes.STRING(100)}
    },
    {
        tableName:'Tb_Jefe_Zonal',
        timestamps:false
    }
)


module.exports = {JZtable};