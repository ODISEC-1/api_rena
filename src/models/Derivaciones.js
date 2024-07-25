const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/bdCon");
const moment = require('moment-timezone');


const Derivaciones = sequelize.define('Derivaciones',{
    Id_registro:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    DNI_Cli:{type:DataTypes.STRING,allowNull:false},
    Nombres:{type:DataTypes.STRING(200),allowNull:false},
    oferta:{type:DataTypes.STRING(20),allowNull:false},
    montoDesem:{type:DataTypes.STRING(20),allowNull:false},
    numero:{type:DataTypes.STRING(10),allowNull:false},
    agencia:{type:DataTypes.INTEGER,allowNull:false},
    jefeZonal:{type:DataTypes.INTEGER,allowNull:false},
    supervisor:{type:DataTypes.INTEGER,allowNull:false},
    DniAsesor:{type:DataTypes.STRING,allowNull:false},
    FechaGestion:{type:DataTypes.DATE,allowNull:false},
    FechaDesem:{type:DataTypes.DATE,allowNull:false},
    FechaRegistro:{type:DataTypes.DATE, allowNull:false, defaultValue: () => moment.tz('America/Lima').subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss')},
    Id_Usuario:{type:DataTypes.INTEGER,allowNull:true,defaultValue:1},
    FechaModificaion:{type:DataTypes.DATE,allowNull:true, defaultValue: () => moment.tz('America/Lima').subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss')},
    Id_Modificador:{type:DataTypes.INTEGER,allowNull:true}
},{
  tableName:'Derivaciones',
  timestamps:false   
})

module.exports ={Derivaciones};