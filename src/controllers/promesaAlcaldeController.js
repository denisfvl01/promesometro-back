'use strict'

var PromesaAlcalde = require('../models/promesaAlcalde');

function registrarPromesa(req, res) {
    var promesaAlcalde = new PromesaAlcalde();
    var params = req.body;

    if (params.descripcion && params.candidato) {
        promesaAlcalde.descripcion = params.descripcion;
        promesaAlcalde.candidato = params.candidato;
        promesaAlcalde.votoSi = 0;
        promesaAlcalde.votoNo = 0;
        promesaAlcalde.votante = [];

        PromesaAlcalde.find({
            descripcion: promesaAlcalde.descripcion,
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'error en la peticion de promesa' });

            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'la promesa ya existe' });
            } else {
                promesaAlcalde.save((err, promesaAlcaldeGuardada) => {
                    if (err) return res.status(500).send({ message: 'Error a la hora de guardar la promesa' });

                    if (promesaAlcaldeGuardada) {
                        return res.status(200).send({ promesa: promesaAlcaldeGuardada });
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
    var promesaAlcaldeId = req.params.id;
    var params = req.body;

    promesaAlcalde.findByIdAndUpdate(promesaAlcaldeId, params, { new: true }, (err, promesaAlcaldeActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!promesaAlcaldeActualizado) return res.status(404).send({ message: 'No se ha podido actuazliar la promesa' });

        return res.status(208).send({ promesa: promesaAlcaldeActualizado });
    });
}

function eliminarPromesa(req, res) {
    var promesaAlcaldeId = req.params.id;
    var params = req.body;

    PromesaAlcalde.findByIdAndDelete(promesaAlcaldeId, params, { new: true }, (err, promesaAlcaldeEliminado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!promesaAlcaldeEliminado) return res.status(404).send({ message: 'No se ha podido eliminar la promesa' });

        return res.status(208).send({ promesa: promesaAlcaldeEliminado });
    });
}

function votarSi(req, res) {
    var promesaAlcaldeAId = req.params.id;
    var votanteID = req.user.sub;

    PromesaAlcalde.findByIdAndUpdate(promesaAlcaldeAId, { $inc: { votoSi: 1 }, $push: { votante: votanteID } }, { new: true }, (err, promesaAlcaldeActualizado) => {
        if (err) return res.status(500).send({ message: 'Error de petición' });

        if (!promesaAlcaldeActualizado) return res.status(404).send({ message: 'No se ha podido actualizar la promesa' });

        return res.status(200).send({ promesa: promesaAlcaldeActualizado });
    });
}

function votarNo(req, res) {
    var promesaAlcaldeId = req.params.id;
    var votanteID = req.user.sub;

    PromesaAlcalde.findByIdAndUpdate(promesaAlcaldeId, { $inc: { votoNo: 1 }, $push: { votante: votanteID } }, { new: true }, (err, promesaAlcaldeActualizado) => {
        if (err) return res.status(500).send({ message: 'Error de petición' });

        if (!promesaAlcaldeActualizado) return res.status(404).send({ message: 'No se ha podido actualizar la promesa' });

        return res.status(200).send({ promesa: promesaAlcaldeActualizado });
    });
}

function listarPorAlcalde(req, res) {
    var alcaldeId = req.params.id;
    var votanteID = req.params.idUser;

    PromesaAlcalde.find({ candidato: alcaldeId }, (err, promesasEncontradas) => {
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
    listarPorAlcalde
}