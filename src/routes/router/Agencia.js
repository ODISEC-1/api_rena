const {Router} = require('express');
const { GetAllAgencia } = require('../../controllers/AgenciaControllers');


const route = Router()


route.get('/',GetAllAgencia)


module.exports = route ;