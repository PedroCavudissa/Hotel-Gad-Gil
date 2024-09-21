const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("hotelgadgil","root","", {
  host: "localhost",
  dialect: 'mysql',
 // logging: true,
});

sequelize.authenticate()
  .then(() => console.log('Conexão estabelecida com sucesso.'))
  .catch(err => console.log('Erro ao conectar:', err));

module.exports = sequelize;
