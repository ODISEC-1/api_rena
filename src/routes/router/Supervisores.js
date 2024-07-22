const {Router} = require('express');
const { GetAllSuper } = require('../../controllers/SupervisorControllers');


const route = Router();

route.get('/',GetAllSuper)


module.exports = route









