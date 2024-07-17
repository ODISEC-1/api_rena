const {Sequelize} = require('sequelize');
require('dotenv').config();


const {DB_HOST,DB_NAME,DB_USER,DB_PASSWORD} = process.env;
const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{host:DB_HOST,dialect:'mysql',logging:false})

sequelize.authenticate().then(()=>{
    console.log('Conectando a la base de datos MYSQL')
}).catch((err)=>{console-log('Nose pudo conectar a la base de datos: ',err)})

module.exports = {sequelize};