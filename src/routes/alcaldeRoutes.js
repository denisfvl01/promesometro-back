'use strict'

var express = require("express");
var AlcaldeController = require("../controllers/alcaldeController");
var md_auth = require('../middleware/aunthenticated');

//SUBIR IMAGEN 
var multiparty = require('connect-multiparty');
var md_subir = multiparty({uploadDir: './src/uploads/alcaldes'});

var api = express.Router();
api.post('/registrar-alcalde', md_auth.ensureAuth, AlcaldeController.registrarAlcalde);
api.post('/subir-imagen-alcalde/:id', [md_auth.ensureAuth, md_subir] ,AlcaldeController.subirImagenAlcalde);
api.get('/obtener-imagen-alcalde/:imageFile', AlcaldeController.getImageFileAlcalde);
api.put('/editar-alcalde/:id', md_auth.ensureAuth, AlcaldeController.editarAlcalde);
api.delete('/eliminar-alcalde/:id', md_auth.ensureAuth, AlcaldeController.eliminarAlcalde);
api.get('/listar-alcalde/:id', md_auth.ensureAuth, AlcaldeController.listarAlcalde);
module.exports = api;