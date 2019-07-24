'use strict'

var express = require("express");
var PresidenteController = require("../controllers/presidenteController");
var md_auth = require('../middleware/aunthenticated');

//SUBIR IMAGEN 
var multiparty = require('connect-multiparty');
var md_subir = multiparty({uploadDir: './src/uploads/presidentes'});

var api = express.Router();
api.post('/registrar-presidente', md_auth.ensureAuth, PresidenteController.registrarPresidente);
api.post('/subir-imagen-presidente/:id', [md_auth.ensureAuth, md_subir] ,PresidenteController.subirImagenPresidente);
api.get('/obtener-imagen-presidente/:imageFile', PresidenteController.getImageFilePresidente);
api.put('/editar-presidente/:id', md_auth.ensureAuth, PresidenteController.editarPresidente);
api.delete('/eliminar-presidente/:id', md_auth.ensureAuth, PresidenteController.eliminarPresidente);
api.get('/listar-presidente/:id', md_auth.ensureAuth, PresidenteController.listarPresidente);

module.exports = api;