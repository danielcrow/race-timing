
import { MongoClient,MongoClientOptions } from 'mongodb';

const uri = process.env["MONGODB_URI"];
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as MongoClientOptions;

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Please set Mongo URI')
}

if (process.env['NODE_ENV'] === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri,options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {

    client = new MongoClient(uri,options)
    clientPromise = client.connect()
}

export default clientPromise