
const { sequelize } = require("../config/bdCon");
const { Afb_data } = require("../models/data.model");
const {Sequelize} = require('sequelize');


const Getdata = async (req, res) => {
    try {
        const alldat = await Afb_data.findAll({limit:1000}) 
        res.status(200).json(alldat);
    } catch (error) {
        console.error('Error en la sincronización de datos:', error);
        res.status(500).json({ error: 'Error en la sincronización de datos' });
    }
};


const GetdataOne = async (req,res)=>{
    const {DNI} = req.params;
     if (!DNI) {
         return res.status(400).json()
     }
   try {
     const busqueda = await Afb_data.findOne({
        where:{DNI: DNI},
        attributes:['DNI',[
            Sequelize.literal("CONCAT(X_NOMBRE, ' ',X_APPATERNO , ' ',X_APMATERNO)"),
            'nombre'
        ],[sequelize.col('OFERTA_MAX'),'oferta'],[sequelize.col('TELF_1'),'numero'] ]
    });
 
    if (!busqueda) {
        return res.status(404).json({ error: 'Registro no encontrado' });
    }
     res.status(200).json({busqueda})
   } catch (error) {
      res.status(400).json(error)    
   }
} 

module.exports = { Getdata, GetdataOne};
