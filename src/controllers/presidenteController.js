'use strict'

var Presidente = require('../models/presidente');
var path = require('path');
var fs = require('fs');

function registrarPresidente(req, res) {
    var presidente = new Presidente();
    var params = req.body;

    if (params.nombre && params.partido) {
        presidente.nombre = params.nombre;
        presidente.partido = params.partido;
        presidente.image = null;

        Presidente.find({ nombre: presidente.nombre.toLowerCase(), partido: presidente.partido })
            .exec((err, users) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion de presidente' });

                if (users && users.length >= 1) {
                    return res.status(500).send({ message: 'el presidente ya existe' });
                } else {
                    presidente.save((err, presidenteGuardado) => {
                        if (err) return res.status(500).send({ message: 'Error a la hora de guardar Presidente' });

                        if (presidenteGuardado) {
                            return res.status(200).send({ presidente: presidenteGuardado });
                        } else {
                            return res.status(404).send({ message: 'no se a podido registrar Presidente' });
                        }
                    })
                }
            });
    } else {
        return res.status(200).send({ message: 'rellene los datos necesarios' });
    }
}

function subirImagenPresidente(req, res) {
    var presidenteId = req.params.id;
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
            Presidente.findByIdAndUpdate(presidenteId, { image: file_name }, { new: true }, (err, presidenteActualizado) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' })

                if (!presidenteActualizado) return res.status(404).send({ message: 'no se a podido actualizar el alcalde' });

                return res.status(200).send({ presidente: presidenteActualizado });
            });
        } else {
            return removeFilerOfUploads(res, file_path, 'Extension no valida');
        }
    }
}

function removeFilerOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    });
}

function getImageFilePresidente(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './src/uploads/presidentes/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe la imagen' });
        }
    });
}

function editarPresidente(req, res) {
    var presidenteId = req.params.id;
    var params = req.body;

    Presidente.findByIdAndUpdate(presidenteId, params, { new: true }, (err, PresidenteActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!PresidenteActualizado) return res.status(404).send({ message: 'no se a podido actualizar presidente' });

        return res.status(200).send({ presidente: PresidenteActualizado });
    });
}

function eliminarPresidente(req, res) {
    var presidenteId = req.params.id;

    Presidente.findByIdAndDelete(presidenteId, (err, presidenteEliminado) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!presidenteEliminado) return res.status(404).send({ message: 'No se ha podido eliminar presidente' });

        return res.status(200).send({ presidente: presidenteEliminado });
    });
}

function listarPresidente(req, res) {
    var partidoId = req.params.id;

    Presidente.find({ partido: partidoId }, (err, presidenteEncontrado) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!presidenteEncontrado) return res.status(404).send({ message: 'No se ha podido encontrar presidente' });

        return res.status(200).send({ presidente: presidenteEncontrado });
    });
}

module.exports = {
    registrarPresidente,
    subirImagenPresidente,
    getImageFilePresidente,
    editarPresidente,
    eliminarPresidente,
    listarPresidente
}