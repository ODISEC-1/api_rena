const { Tabla_Agencia } = require("../models/Agencia.model");
const { Derivaciones } = require("../models/Derivaciones");
const moment = require('moment');
const { JZtable } = require("../models/JZ.model");
const { supervisorTable } = require("../models/Supervisor.model");

const formatDateForDatabase = (datestring) => {
  return moment.tz(datestring, 'America/Lima').subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss');
}




const PostDerivaciones = async (req, res) => {
  const {
    nombre,
    oferta,
    numero,
    dni,
    jefeZonal,
    supervisor,
    Asesor,
    horaLlegadaCorreo,
    fechaDesembolso,
    montoDesembolso,
    agencia,
  } = req.body;
  if (!nombre || !oferta || !dni) {
    return res.status(400).json({ error: 'Nombre, oferta y DNI son requeridos' });
  }

  try {

    console.log(horaLlegadaCorreo,fechaDesembolso)
    const formatFG = formatDateForDatabase(horaLlegadaCorreo);
    console.log(formatFG)
    const formatFD = formatDateForDatabase(fechaDesembolso);
    console.log(formatFD)

    const CreateDerivaciones = await Derivaciones.create({
      DNI_Cli: dni,
      Nombres: nombre,
      oferta: oferta,
      montoDesem: montoDesembolso,
      numero: numero,
      agencia: agencia,
      jefeZonal: jefeZonal,
      supervisor: supervisor,
      DniAsesor: Asesor,
      FechaGestion: formatFG,
      FechaDesem: formatFD,
    });


    return res.status(201).json({ message: 'Derivación creada exitosamente', data: CreateDerivaciones });
  } catch (error) {
    console.error('Error creating derivación:', error);
    return res.status(500).json({ error: 'Error creando la derivación' });
  }
};


const AllDerivation = async (req,res)=>{
    try {
        const dataDerivation = await Derivaciones.findAll({
          include:[
            {model:Tabla_Agencia,
              attributes:['Agencia']
            },
            {
              model:JZtable,
              attributes:['Nombre_JZ']
            },
            {
              model:supervisorTable,
              attributes:['Nombre_Super']
            }
          ]
        })
        res.status(201).json(dataDerivation) 
    } catch (error) {
        console.error('Error getting derivación:', error);
    return res.status(500).json({ error: 'Error pidiendo la derivación' });
    }
}




module.exports = { PostDerivaciones, AllDerivation };
