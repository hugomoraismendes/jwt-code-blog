const express = require('express');
const app = express();
// const bodyParser = require('body-parser');

//remover
const { estrategiasAutenticacao } = require('../business/users');

app.use(express.urlencoded({ extended: true }));

module.exports = app;
