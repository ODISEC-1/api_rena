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
        console.log(dataDerivation)
        res.status(201).json(dataDerivation) 
    } catch (error) {
        console.error('Error getting derivación:', error);
    return res.status(500).json({ error: 'Error pidiendo la derivación' });
    }
}



const UpdateDerivacion=  async (req, res) => {
  const { id } = req.params;
  const {
    numero,
    agencia,
    jefeZonal,
    supervisor,
    horaLlegadaCorreo,
    fechaDesembolso,
    montoDesembolso,
    Asesor
  } = req.body;
   console.log(req.body)

  if (
    !numero ||
    !agencia ||
    !jefeZonal ||
    !supervisor ||
    !horaLlegadaCorreo ||
    !fechaDesembolso ||
    !montoDesembolso ||
    !Asesor
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const derivacion = await Derivaciones.findByPk(id);

    if (!derivacion) {
      return res.status(404).json({ message: 'Derivacion not found' });
    }
    derivacion.numero = numero;
    derivacion.agencia = agencia;
    derivacion.jefeZonal = jefeZonal;
    derivacion.supervisor = supervisor;
    derivacion.FechaGestion = horaLlegadaCorreo;
    derivacion.FechaDesem = fechaDesembolso;
    derivacion.montoDesem = montoDesembolso;
    derivacion.DniAsesor = Asesor;
    derivacion.FechaModificaion = moment.tz('America/Lima').subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss');

    await derivacion.save();

    res.json({ message: 'Derivacion updated successfully', derivacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const BusquedaId = async (req,res)=>{
 const {id} = req.params

try {
  const busquedaDerivaciones = await Derivaciones.findByPk(id) 

  res.status(200).json(busquedaDerivaciones);
} catch (error) {
  console.error('Error getting derivación:', error);
  return res.status(500).json({ error: 'Error pidiendo la derivación' });
}
}

module.exports = { PostDerivaciones, AllDerivation,UpdateDerivacion,BusquedaId };
