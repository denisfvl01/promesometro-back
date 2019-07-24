'use strict'

const express = require("express");
const app = express();
const bodyparser = require("body-parser");

//CARGAR RUTAS
var user_routes = require('./routes/userRoutes');
var partido_routes = require('./routes/partidoRoutes');
var presidente_routes = require('./routes/presidenteRoutes');
var alcalde_routes = require('./routes/alcaldeRoutes');
var promesasP_routes = require('./routes/promesaPresidenteRoutes');
var promesasA_routes = require('./routes/promesaAlcaldeRoutes');

//MIDDELWARES
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

//CABEZERAS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//RUTAS
app.use('/api', user_routes, presidente_routes, partido_routes);
app.use('/api', alcalde_routes, promesasP_routes, promesasA_routes);

//EXPORTAR
module.exports = app;