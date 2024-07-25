const {Router} = require('express');
const { PostDerivaciones, AllDerivation, UpdateDerivacion, BusquedaId } = require('../../controllers/DerivarionesControllers');

const route = Router();

route.post('/',PostDerivaciones)
route.get('/',AllDerivation)
route.put('/:id',UpdateDerivacion)
route.get('/:id',BusquedaId)


module.exports = route;