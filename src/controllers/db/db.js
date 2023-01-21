import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
let db;

const mongoClient = new MongoClient('mongodb://localhost:27017');

try {

  await mongoClient.connect();
  
} catch (error) {

  console.log(error);

}

db = mongoClient.db('dbMyWallet');

export default db;


