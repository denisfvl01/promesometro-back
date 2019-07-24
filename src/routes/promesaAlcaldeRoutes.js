'use strict'

var express = require("express");
var PromesaAlcaldeController = require("../controllers/promesaAlcaldeController");
var md_auth = require('../middleware/aunthenticated');

var api = express.Router();
api.post('/registrar-promesa-alcalde', PromesaAlcaldeController.registrarPromesa);
api.put('/editar-promesa-alcalde/:id', md_auth.ensureAuth, PromesaAlcaldeController.editarPromesa);
api.delete('/eliminar-promesa-alcalde/:id', md_auth.ensureAuth, PromesaAlcaldeController.eliminarPromesa);
api.get('/listar-promesas-alcalde/:id', md_auth.ensureAuth, PromesaAlcaldeController.listarPorAlcalde);
api.put('/votar-si-promesa-alcalde/:id', md_auth.ensureAuth, PromesaAlcaldeController.votarSi);
api.put('/votar-no-promesa-alcalde/:id', md_auth.ensureAuth, PromesaAlcaldeController.votarNo);

module.exports = api;