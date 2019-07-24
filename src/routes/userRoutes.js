'use strict'

var express = require("express");
var UserController = require("../controllers/userController");
var md_auth = require('../middleware/aunthenticated');

//SUBIR IMAGEN 
var multiparty = require('connect-multiparty');
var md_subir = multiparty({uploadDir: './src/uploads/users'});
 
var api = express.Router();
api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.post('/subir-image-usuario/:id', [md_auth.ensureAuth, md_subir] ,UserController.subirImagen)
api.get('/obtener-imagen-usuario/:imageFile', UserController.getImageFile)
api.put('/editar-usuario/:id', md_auth.ensureAuth, UserController.editarUsuario)
module.exports = api;