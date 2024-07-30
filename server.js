const express = require('express');
const cors = require('cors');
const router = require('./src/routes/index');
const { sequelize } = require('./src/config/bdCon');

// modelos
require('./src/models/Derivaciones');
require('./src/models/JZ.model');
require('./src/models/Supervisor.model');
require('./src/models/Agencia.model');
require('./src/models/helpers/ModelHelper');
// finModelos

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

sequelize.sync().then(() => {
  console.log('Modelos Sincronizados con la base de datos');
  app.listen(port, () => {
    console.log(`servidor escuchando en http://localhost:${port}`);
  });
}).catch((err) => {
  console.log(err);
});
