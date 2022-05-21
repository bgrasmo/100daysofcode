const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

const initDb = async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  database = client.db('quote-api');
}

const getDb = () => {
  if (!database) {
    throw new Error('Database not connected');
  }
  return database;
}

module.exports = {
  initDb: initDb,
  getDb: getDb,
}