import { MongoClient, ServerApiVersion } from 'mongodb';

// Ambil URI dari variabel lingkungan
const uri = process.env.MONGODB_URI;

// Pastikan URI tidak undefined
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local or Vercel Environment Variables');
}

// Buat klien MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function handler(req, res) {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Log connection success
    console.log("Connected to MongoDB");

    // Check request method
    if (req.method === 'POST') {
      const { title, content, image, author } = req.body;
      
      // Log incoming data
      console.log("Received data:", { title, content, image, author });

      // Insert new post into the MongoDB collection
      const db = client.db("your-database-name");
      const collection = db.collection("posts");
      const result = await collection.insertOne({
        title, content, image, author, timestamp: new Date()
      });
      
      // Log result
      console.log("Insert result:", result);

      res.status(201).json(result);
    } else if (req.method === 'GET') {
      // Retrieve posts from the MongoDB collection
      const db = client.db("your-database-name");
      const collection = db.collection("posts");
      const posts = await collection.find({}).sort({ timestamp: -1 }).toArray();
      
      // Log posts
      console.log("Retrieved posts:", posts);

      res.status(200).json(posts);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Log error
    console.error("MongoDB connection error:", error);
    
    res.status(500).json({ message: "Failed to connect to MongoDB", error });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}