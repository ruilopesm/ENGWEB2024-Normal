var express = require('express');
var router = express.Router();
var axios = require('axios');

const api_url = 'http://engweb2024-normal-ex1-1:16000';

router.get('/', function(req, res, next) {
  axios.get(api_url + '/contratos')
    .then(response => {
      res.render('index', { contratos: response.data });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

router.get('/:id', function(req, res, next) {
  axios.get(api_url + '/contratos/' + req.params.id)
    .then(response => {
      res.render('contrato', { contrato: response.data });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

router.get('/entidades/:nipc', function (req, res, next) {
  axios.get(api_url + '/contratos?entidade=' + req.params.nipc)
    .then(response => {
      let contratos = response.data;
      let somatorio = contratos.reduce((acc, contrato) => acc + contrato.precoContratual, 0);

      let entidade = {
        "nipc": req.params.nipc,
        "nome": contratos[0].entidade_comunicante
      };

      res.render('entidade', { entidade: entidade, contratos: response.data, somatorio: somatorio });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

module.exports = router;
