'use strict'

var bcrypt = require("bcrypt-nodejs");
var Alcalde = require('../models/alcalde');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

function registrarAlcalde(req, res) {
    var alcalde = new Alcalde();
    var params = req.body;

    if (params.nombre && params.partido) {
        alcalde.nombre = params.nombre;
        alcalde.partido = params.partido;
        alcalde.image = null;

        Alcalde.find({
            $or: [
                { nombre: alcalde.nombre.toLowerCase() },
                { partido: alcalde.partido }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de alcalde' });

            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'el alcalde ya existe' });
            } else {
                alcalde.save((err, alcaldeGuardado) => {
                    if (err) return res.status(500).send({ message: 'Error a la hora de guardar alcalde' });

                    if (alcaldeGuardado) {
                        return res.status(200).send({ alcalde: alcaldeGuardado });
                    } else {
                        return res.status(404).send({ message: 'no se a podido registrar alcalde' });
                    }
                });
            }
        });
    } else {
        return res.status(200).send({ message: 'rellene los datos necesarios' });
    }
}

function subirImagenAlcalde(req, res) {
    var alcaldeId = req.params.id;
    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path);

        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[3];
        console.log(file_name);

        var ext_xplit = file_name.split('\.');
        console.log(ext_xplit);

        var file_ext = ext_xplit[1];
        console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Alcalde.findByIdAndUpdate(alcaldeId, { image: file_name }, { new: true }, (err, usuarioActualizado) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' });

                if (!usuarioActualizado) return res.status(404).send({ message: 'no se a podido actualizar el alcalde' });

                return res.status(200).send({ alcalde: usuarioActualizado });
            });
        } else {
            return removeFilerOfUploads(res, file_path, 'Extension no valida');
        }
    }
}

function removeFilerOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}

function getImageFileAlcalde(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './src/uploads/alcaldes/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe la imagen' })
        }
    })
}

function editarAlcalde(req, res) {
    var alcaldeId = req.params.id;
    var params = req.body;

    Alcalde.findByIdAndUpdate(alcaldeId, params, { new: true }, (err, AlcaldeActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!AlcaldeActualizado) return res.status(404).send({ message: 'no se a podido actualizar al alcalde' });

        return res.status(200).send({ alcalde: AlcaldeActualizado });
    });
}

function listarAlcalde(req, res) {
    var partidoId = req.params.id;

    Alcalde.find({ partido: partidoId }, (err, AlcaldeEncontrado) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!AlcaldeEncontrado) return res.status(404).send({ message: 'No se ha podido obtener al alcalde' });

        return res.status(200).send({ alcalde: AlcaldeEncontrado });
    });
}

function eliminarAlcalde(req, res) {
    var alcaldeId = req.params.id;

    Alcalde.findByIdAndDelete(alcaldeId, (err, alcaldeEliminado) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!alcaldeEliminado) return res.status(404).send({ message: 'No se ha podido eliminar alcalde' });

        return res.status(200).send({ alcalde: alcaldeEliminado });
    });
}

module.exports = {
    registrarAlcalde,
    subirImagenAlcalde,
    getImageFileAlcalde,
    editarAlcalde,
    listarAlcalde,
    eliminarAlcalde
}