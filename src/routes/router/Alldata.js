// AllDataRoutes.js
const { Router } = require('express');
const { Getdata, GetdataOne } = require('../../controllers/AllDataControllers');

const route = Router();

route.get('/', Getdata);
route.get('/:DNI',GetdataOne)

module.exports = route;
