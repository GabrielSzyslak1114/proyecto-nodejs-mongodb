const express = require('express');
const validarURL = require('../middlewares/urlValid')

/**
 * Se importa del homeController las funciones para ver y manipular los datos de la base de datos 
 * a traves de la ruta "/"
 * 
 */
const {viewUrl, addUrl, eliminarUrl, editarURLForm, editarUrl} = require('../controllers/homeControllers');
const router = express.Router();

router.get('/', viewUrl);
router.post('/', validarURL, addUrl);
router.get("/eliminar/:id", eliminarUrl); 
router.get('/editar/:id', editarURLForm)
router.post('/editar/:id', validarURL, editarUrl)
/**
 * se exporta para ejecutarlo en el archivo principal
 */
module.exports = router;