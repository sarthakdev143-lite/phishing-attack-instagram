import { MongoClient, Db } from "mongodb";

declare global {
    // allow global caching in dev to avoid hot-reload problems
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI!;
if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    // use global cache in dev
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // in production, it's fine to create a new client
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
    const client = await clientPromise;
    return client.db(); // we can pass a database name here if not using default
}
