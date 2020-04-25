require('dotenv').config();

module.exports = {
    "development": {
      "username": "root",
      "password": null,
      "database": 'database_dev',
      "storage": "database_dev.sqlite",
      "host": "127.0.0.1",
      "dialect": "sqlite"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": process.env.CI_DB_NAME,
      "storage": "database_test.sqlite",
      "host": "127.0.0.1",
      "dialect": "sqlite"
    },
    "staging": {
      "username": process.env.STAGING_DB_USERNAME,
      "password": process.env.STAGING_DB_PASSWORD,
      "database": process.env.STAGING_DB_NAME,
      "host": process.env.STAGING_DB_HOSTNAME,
      "port": process.env.STAGING_DB_PORT,
      "dialect": "postgres",
      "ssl":true,
      "dialectOptions":{
        "ssl":{
           "require":true
        }
      }
    },
    "production": {
      "username": process.env.PROD_DB_USERNAME,
      "password": process.env.PROD_DB_PASSWORD,
      "database": process.env.PROD_DB_NAME,
      "host": process.env.PROD_DB_HOSTNAME,
      "port": process.env.PROD_DB_PORT,
      "dialect": "postgres",
    }
};