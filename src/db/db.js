import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
let db;

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {

  await mongoClient.connect();
  
} catch (error) {

  console.log(error);

}

db = mongoClient.db();

export default db;


