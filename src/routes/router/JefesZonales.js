const {Router} = require('express');
const { GetAllJZ } = require('../../controllers/JZControllers');

const route = Router();

route.get('/',GetAllJZ)

module.exports = route;