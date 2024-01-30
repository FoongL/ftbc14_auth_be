"use strict";
// importing everything we need && initilizing variables we will ultimately pass out (db)
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const db = {};

// Develops the connection into the DB
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
    }
  );
}
// else if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config); // this line is not used at all (but given by default)
// }
else {
  // we are using this line in bigfoot SQL
  sequelize = new Sequelize(
    config?.database || process.env.DB_DATABASE,
    config?.username || process.env.DB_USERNAME,
    config?.password || process.env.DB_PASSWORD,
    config || {
      username: process.env.DB_USERNAME,
      password: null,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );
}

// Going through the current directory and finding all the models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename && // basename === 'index.js'
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // importing and initializing each model in our "models" directory
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    //storing the model into the empty db object
    db[model.name] = model;
  });

// taking each model, and creating the associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
