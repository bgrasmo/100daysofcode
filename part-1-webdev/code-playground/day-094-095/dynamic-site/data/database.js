const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';

let database;

async function initDatabase() {
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db('deployment');
}

function getDb() {
  if (!database) {
    throw new Error('No database connected!');
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
