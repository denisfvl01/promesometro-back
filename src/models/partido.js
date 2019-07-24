'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PartidoSchema = Schema({
    nombre: String,
    descripcion: String,
    image: String
});

module.exports = mongoose.model('Partido', PartidoSchema)