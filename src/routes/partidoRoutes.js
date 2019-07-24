'use strict'

var express = require("express");
var PartidoController = require("../controllers/partidoController");
var md_auth = require('../middleware/aunthenticated');

//SUBIR IMAGEN 
var multiparty = require('connect-multiparty');
var md_subir = multiparty({uploadDir: './src/uploads/partidos'});

var api = express.Router();
api.post('/registrar-partido', md_auth.ensureAuth, PartidoController.registrarPartido);
api.post('/subir-imagen-partido/:id', [md_auth.ensureAuth, md_subir] ,PartidoController.subirImagenPartido);
api.get('/obtener-imagen-partido/:imageFile', PartidoController.getImageFilePartido);
api.put('/editar-partido/:id', md_auth.ensureAuth, PartidoController.editarPartido);
api.delete('/eliminar-partido/:id', md_auth.ensureAuth, PartidoController.eliminarPartido);
api.get('/listar-partidos', md_auth.ensureAuth, PartidoController.listarPartidos);
api.get('/listar-partido/:id', md_auth.ensureAuth, PartidoController.getPartido);

module.exports = api;