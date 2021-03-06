const express = require('express');

const User = require('./service/User');
const sessao = require('./service/sessao');

const connection = require('./conexao/database');

const routes = express.Router();

routes.post('/sessions', sessao.create);

routes.get('/usuarios', User.index);
routes.post('/usuarios', User.create);

module.exports = routes;