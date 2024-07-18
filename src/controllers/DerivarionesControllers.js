const { Derivaciones } = require("../models/Derivaciones");

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
      FechaGestion: horaLlegadaCorreo,
      FechaDesem: fechaDesembolso,
    });


    return res.status(201).json({ message: 'Derivación creada exitosamente', data: CreateDerivaciones });
  } catch (error) {
    console.error('Error creating derivación:', error);
    return res.status(500).json({ error: 'Error creando la derivación' });
  }
};


const AllDerivation = async (req,res)=>{
    try {
        const dataDerivation = await Derivaciones.findAll()
        res.status(201).json(dataDerivation) 
    } catch (error) {
        console.error('Error getting derivación:', error);
    return res.status(500).json({ error: 'Error pidiendo la derivación' });
    }
}




module.exports = { PostDerivaciones, AllDerivation };
