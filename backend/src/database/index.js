const knex = require('knex')
const config = require('../knex')

const localhost = knex(config.localhost);

module.exports = { localhost }