'use strict'

var Partido = require('../models/partido');
var path = require('path');
var fs = require('fs');

function registrarPartido(req, res) {
    var partido = new Partido();
    var params = req.body;

    if (params.nombre && params.descripcion) {
        partido.nombre = params.nombre;
        partido.descripcion = params.descripcion;
        partido.image = null;

        Partido.find({
            $or: [
                { nombre: partido.nombre.toLowerCase() },
                { descripcion: partido.descripcion.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de partido' })

            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'el Partido ya existe' });
            } else {
                partido.save((err, partidoGuardado) => {
                    if (err) return res.status(500).send({ message: 'Error a la hora de guardar el partido' })

                    if (partidoGuardado) {
                        res.status(200).send({ partido: partidoGuardado })
                    } else {
                        res.status(404).send({ message: 'no se a podido registrar al partido' })
                    }
                });
            }
        });
    } else {
        return res.status(200).send({ message: 'rellene los datos necesarios' })
    }
}

function subirImagenPartido(req, res) {
    var partidoId = req.params.id;
    
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
            Partido.findByIdAndUpdate(partidoId, { image: file_name }, { new: true }, (err, partidoActualizado) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' })

                if (!partidoActualizado) return res.status(404).send({ message: 'no se a podido actualizar el usuario' })

                return res.status(200).send({ partido: partidoActualizado })
            });
        } else {
            return removeFilerOfUploads(res, file_path, 'Extension no valida')
        }
    }
}

function removeFilerOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    });
}

function getImageFilePartido(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './src/uploads/partidos/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe la imagen' })
        }
    });
}

function editarPartido(req, res) {
    var partidoId = req.params.id;
    var params = req.body;

    Partido.findByIdAndUpdate(partidoId, params, { new: true }, (err, partidoActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!partidoActualizado) return res.status(404).send({ message: 'no se a podido actualizar al partido' });

        return res.status(200).send({ partido: partidoActualizado });
    });
}

function eliminarPartido(req, res) {
    var partidoId = req.params.id;

    Partido.findByIdAndDelete(partidoId, (err, partidoEliminado) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!partidoEliminado) return res.status(404).send({ message: 'No se ha podido eliminar al partido' });

        return res.status(200).send({ partido: partidoEliminado });
    });
}

function listarPartidos(req, res) {
    Partido.find((err, PartidosEncontrados) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!PartidosEncontrados) return res.status(404).send({ message: 'No se han podido listar partidos' });

        return res.status(200).send({ partidos: PartidosEncontrados });
    });
}

function getPartido(req, res) {
    var partidoId = req.params.id;

    Partido.findById(partidoId, (err, partidoEncontrado) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!partidoEncontrado) return res.status(404).send({ message: 'No se ha podido encontrar partido' });

        return res.status(200).send({ partido: partidoEncontrado });
    });
}

module.exports = {
    registrarPartido,
    subirImagenPartido,
    getImageFilePartido,
    editarPartido,
    listarPartidos,
    getPartido,
    eliminarPartido
}