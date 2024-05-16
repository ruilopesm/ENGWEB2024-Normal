var express = require('express');
var router = express.Router();

var Contrato = require('../controllers/contrato');

router.get('/', function(req, res, next) {
  /* Filter by entidade */
  if (req.query.entidade) {
    Contrato.listByEntidade(req.query.entidade)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
    
    return
  }

  /* Filter by tipo */
  if (req.query.tipo) {
    Contrato.listByTipo(req.query.tipo)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
    
    return
  }

  /* Normal listing */
  Contrato.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* Devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições */
router.get('/entidades', function(req, res, next) {
  Contrato.listEntidades()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* Tipos agora */
router.get('/tipos', function(req, res, next) {
  Contrato.listTipos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* Devolve o registo com identificador id (corresponde ao campo _id da BD) */
router.get('/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* Acrescenta um registo novo à BD */
router.post('/', function(req, res, next) {
  Contrato.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* Elmina da BD o registo com identificador id */
router.delete('/:id', function(req, res, next) {
  Contrato.remove(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* Atualiza o registo com identificador id */
router.put('/:id', function(req, res, next) {
  Contrato.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
