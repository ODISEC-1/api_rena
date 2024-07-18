const {Router} = require('express');
const { PostDerivaciones, AllDerivation } = require('../../controllers/DerivarionesControllers');

const route = Router();

route.post('/',PostDerivaciones)
route.get('/',AllDerivation)


module.exports = route