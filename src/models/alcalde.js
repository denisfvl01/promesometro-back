'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlcaldeSchema = Schema({
    nombre: String,
    partido: {type: Schema.ObjectId, ref:'Partido'},
    image: String
});

module.exports = mongoose.model('Alcalde', AlcaldeSchema)