import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("your-database-name");
  const collection = db.collection("posts");

  if (req.method === "POST") {
    const { title, content, image, author } = req.body;
    const result = await collection.insertOne({
      title,
      content,
      image,
      author,
      timestamp: new Date(),
    });
    res.status(201).json(result);
  } else if (req.method === "GET") {
    const posts = await collection.find({}).sort({ timestamp: -1 }).toArray();
    res.status(200).json(posts);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};