const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

let database;

const initDB = (callback) => {
  if (database) {
    console.log("Database is already online!");
    return callback(null, database);
  }
  MongoClient.connect(process.env.mongo)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error("Database is not online");
  } else {
    return database;
  }
};

module.exports = { initDB, getDatabase };