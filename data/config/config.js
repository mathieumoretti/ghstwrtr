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
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
};