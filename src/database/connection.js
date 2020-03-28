const knex = require('knex');
const configuration = require('../../knexfile');
const { NODE_ENV } = process.env;
const env = NODE_ENV || 'development';
const connection = knex(configuration[env]);

module.exports = connection;