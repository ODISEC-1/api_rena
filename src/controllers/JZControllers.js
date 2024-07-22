const { JZtable } = require("../models/JZ.model")

 
 
 
 const GetAllJZ = async(req,res)=>{
    try {
        const AllJZ = await JZtable.findAll()
        res.status(200).json(AllJZ);
    } catch (error) {
        console.error('Error en la sincronización de datos:', error);
        res.status(500).json({ error: 'Error en la sincronización de datos' });
    }
 }





 module.exports = {GetAllJZ};