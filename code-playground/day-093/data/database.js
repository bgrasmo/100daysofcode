const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

// MongoClient.connect('localhost:27017');

let database;

const connectToDatabase = async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  database = client.db('online-shop');
}

const getDb = () => {
  if (!database) {
    throw new Error('You must connect first!')
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
