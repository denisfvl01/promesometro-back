'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PromesaAlcaldeSchema = Schema({
    descripcion: String,
    candidato: {type: Schema.ObjectId, ref:'Alcalde'},
    votoSi: Number,
    votoNo: Number,
    votantes: [ String ]
});

module.exports = mongoose.model('PromesaAlcalde', PromesaAlcaldeSchema)