const { supervisorTable } = require("../models/Supervisor.model")

const GetAllSuper =async (req,res)=>{
 try {
    const AllSuper = await supervisorTable.findAll();
    res.status(200).json(AllSuper);
 } catch (error) {
    console.error('Error en la sincronización de datos:', error);
    res.status(500).json({ error: 'Error en la sincronización de datos' });

 }
} 




module.exports ={GetAllSuper};