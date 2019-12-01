import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];

const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options);

module.exports = connection;