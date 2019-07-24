'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PromesaPresidenteSchema = Schema({
    descripcion: String,
    candidato: {type: Schema.ObjectId, ref:'Presidente'},
    votoSi: Number,
    votoNo: Number,
    votantes: [ String ]
});

module.exports = mongoose.model('PromesaPresidente', PromesaPresidenteSchema)