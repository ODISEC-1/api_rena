const express = require('express');
const cors = require('cors');
const router = require('./src/routes/index');
const {sequelize} = require('./src/config/bdCon')


// Modelos
require('./src/models/Derivaciones');
require('./src/models/JZ.model');
require('./src/models/Supervisor.model');
require('./src/models/Agencia.model');
require('./src/models/helpers/ModelHelper');
// Fin de modelos

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err);
  res.status(500).send('Something broke!');
});

sequelize.sync()
  .then(() => {
    console.log('Modelos Sincronizados con la base de datos');
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar modelos:', err);
  });
