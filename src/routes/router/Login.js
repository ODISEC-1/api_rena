const {Router} = require('express');
const { Login } = require('../../controllers/UsuarioControllers');

const route = Router();


route.post('/',Login)


module.exports = route



