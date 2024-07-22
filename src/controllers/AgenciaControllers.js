const { Tabla_Agencia } = require("../models/Agencia.model");


const GetAllAgencia = async(req,res)=>{
  try {
    const AllAgencia = await Tabla_Agencia.findAll()
    res.status(200).json(AllAgencia)
  } catch (error) {
    console.error('Error en la sincronización de datos:', error);
        res.status(500).json({ error: 'Error en la sincronización de datos' });
  }
}


module.exports = {GetAllAgencia};