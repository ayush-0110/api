import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'your-db-name';

export let client: MongoClient;

export async function connect() {
  // client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client = new MongoClient(uri);
  await client.connect();
  console.log('Connected to MongoDB');
}

export async function close() {
  await client.close();
}
