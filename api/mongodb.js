import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

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
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    res.status(200).json({ message: "Successfully connected to MongoDB!" });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ message: "Failed to connect to MongoDB", error });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}