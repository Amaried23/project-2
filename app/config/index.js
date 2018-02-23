const mysql = require('mysql')
const Sequelize = require('sequelize')

var sequelize = new Sequelize('helpinghands_db', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});