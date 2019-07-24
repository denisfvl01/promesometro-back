'use strict'

var PromesaPresidente = require('../models/promesaPresindente');

function registrarPromesa(req, res) {
    var promesaPresidente = new PromesaPresidente();
    var params = req.body;

    if (params.descripcion && params.candidato) {
        promesaPresidente.descripcion = params.descripcion;
        promesaPresidente.candidato = params.candidato;
        promesaPresidente.votoSi = 0;
        promesaPresidente.votoNo = 0;
        promesaPresidente.votantes = [];

        PromesaPresidente.find({
            descripcion: promesaPresidente.descripcion,
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'error en la peticion de promesa' });

            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'la promesa ya existe' });
            } else {
                promesaPresidente.save((err, promesaPresidenteGuardado) => {
                    if (err) return res.status(500).send({ message: 'Error a la hora de guardar la promesa' });

                    if (promesaPresidenteGuardado) {
                        return res.status(200).send({ promesa: promesaPresidenteGuardado });
                    } else {
                        return res.status(404).send({ message: 'no se ha podido crear la promesa' });
                    }
                });
            }
        })
    } else {
        return res.status(200).send({ message: 'rellene los datos necesarios' });
    }
}

function editarPromesa(req, res) {
    var promesaPresidenteId = req.params.id;
    var params = req.body;

    PromesaPresidente.findByIdAndUpdate(promesaPresidenteId, params, { new: true }, (err, promesaPresidenteActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!promesaPresidenteActualizado) return res.status(404).send({ message: 'No se ha podido actuazliar la promesa' });

        return res.status(208).send({ promesa: promesaPresidenteActualizado });
    });
}

function eliminarPromesa(req, res) {
    var promesaPresidenteId = req.params.id;

    PromesaPresidente.findByIdAndDelete(promesaPresidenteId, (err, promesaPresidenteEliminado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!promesaPresidenteEliminado) return res.status(404).send({ message: 'No se ha podido eliminar la promesa' });

        return res.status(208).send({ promesa: promesaPresidenteEliminado });
    });
}

function votarSi(req, res) {
    var promesaPresidenteId = req.params.id;
    var votanteID = req.user.sub;

    PromesaPresidente.findByIdAndUpdate(promesaPresidenteId, { $inc: { votoSi: 1 }, $push: { votante: votanteID } }, { new: true }, (err, promesaPresidenteActualizado) => {
        if (err) return res.status(500).send({ message: 'Error de petición' });

        if (!promesaPresidenteActualizado) return res.status(404).send({ message: 'No se ha podido actualizar la promesa' });

        return res.status(200).send({ promesa: promesaPresidenteActualizado });
    });
}

function votarNo(req, res) {
    var promesaPresidenteId = req.params.id;
    var votanteID = req.user.sub;

    PromesaPresidente.findByIdAndUpdate(promesaPresidenteId, { $inc: { votoNo: 1 }, $push: { votante: votanteID } }, { new: true }, (err, promesaPresidenteActualizado) => {
        if (err) return res.status(500).send({ message: 'Error de petición' });

        if (!promesaPresidenteActualizado) return res.status(404).send({ message: 'No se ha podido actualizar la promesa' });

        return res.status(200).send({ promesa: promesaPresidenteActualizado });
    });
}

function listarPorPresidente(req, res) {
    var presidenteId = req.params.id;

    PromesaPresidente.find({ candidato: presidenteId }, (err, promesasEncontradas) => {
        if (err) return res.status(500).send({ message: 'Error de petición' });

        if (!promesasEncontradas) return res.status(404).send({ message: 'No se han podido listar promesas' });

        return res.status(200).send({ promesas: promesasEncontradas });
    });
}

module.exports = {
    registrarPromesa,
    editarPromesa,
    eliminarPromesa,
    votarSi,
    votarNo,
    listarPorPresidente
}