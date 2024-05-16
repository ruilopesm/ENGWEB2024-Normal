const mongoose = require('mongoose');
var Contrato = require('../models/contrato');

module.exports.list = () => {
    return Contrato.find().exec();
}

module.exports.findById = (id) => {
    return Contrato.findOne({ _id: id }).exec();
}

module.exports.listByEntidade = (entidade) => {
    return Contrato.find({ entidade_comunicante: entidade }).exec();
}

module.exports.listByTipo = (tipo) => {
    return Contrato.find({ tipoprocedimento: tipo }).exec();
}

module.exports.listEntidades = () => {
    return Contrato.distinct("entidade_comunicante").sort().exec();
}

module.exports.listTipos = () => {
    return Contrato.distinct("tipoprocedimento").sort().exec();
}

module.exports.insert = (contrato) => {
    if (Contrato.find({ _id: contrato._id }).exec().length != 1) {
        var newContrato = new Contrato(contrato);
        return newContrato.save();
    }
    
    return Promise.reject(new Error('Contrato já existe'));
}

module.exports.remove = (id) => {
    return Contrato.find({ _id: id }).deleteOne().exec();
}

module.exports.update = (id, contrato) => {
    return Contrato.findByIdAndUpdate(id, contrato, { new: true }).exec();
}
