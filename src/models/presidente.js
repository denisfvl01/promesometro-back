'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PresidenteSchema = Schema({
    nombre: String,
    partido: {type: Schema.ObjectId, ref:'Partidos'},
    image: String
});

module.exports = mongoose.model('Presidente', PresidenteSchema)