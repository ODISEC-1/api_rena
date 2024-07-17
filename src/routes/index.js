// index.js en src/routes
const { Router } = require('express');
const { readdirSync } = require('fs');
const path = require('path');

const router = Router();
const ROUTES_PATH = path.join(__dirname, 'router');

const cleanFileName = (filename) => {
    return filename.split('.').shift();
};

readdirSync(ROUTES_PATH).forEach((filename) => {
    const cleanName = cleanFileName(filename);
    if (cleanName !== 'index') {
        const route = require(path.join(ROUTES_PATH, filename));
        console.log(`Cargando ruta: ${cleanName}`);
        router.use(`/${cleanName}`, route);
    }
});

module.exports = router;
