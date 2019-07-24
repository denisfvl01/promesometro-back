'use strict'

var express = require("express");
var PromesaPresidenteController = require("../controllers/promesaPresidenteController");
var md_auth = require('../middleware/aunthenticated');

var api = express.Router();
api.post('/registrar-promesa-presidente', PromesaPresidenteController.registrarPromesa);
api.put('/editar-promesa-presidente/:id', md_auth.ensureAuth, PromesaPresidenteController.editarPromesa);
api.delete('/eliminar-promesa-presidente/:id', md_auth.ensureAuth, PromesaPresidenteController.eliminarPromesa);
api.get('/listar-promesas-presidente/:id', md_auth.ensureAuth, PromesaPresidenteController.listarPorPresidente);
api.put('/votar-si-promesa-presidente/:id', md_auth.ensureAuth, PromesaPresidenteController.votarSi);
api.put('/votar-no-promesa-presidente/:id', md_auth.ensureAuth, PromesaPresidenteController.votarNo);

module.exports = api;