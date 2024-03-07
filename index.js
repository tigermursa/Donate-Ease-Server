const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);
// MongoDB Connection URL
const { ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("assignment-7");
    const collection = db.collection("users");
    const dataCollection = db.collection("data");
    const dataTestimonials = db.collection("testimonial");
    const dataGratitudeWall = db.collection("gratitudewall");
    const dataVolunteer = db.collection("volunteer");

    // User Registration
    app.post("/api/v1/register", async (req, res) => {
      const { name, email, password } = req.body;

      // Check if email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      await collection.insertOne({ name, email, password: hashedPassword });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    });

    // User Login
    app.post("/api/v1/login", async (req, res) => {
      const { email, password } = req.body;

      // Find user by email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });

      res.json({
        success: true,
        message: "Login successful",
        token,
      });
    });

    // ==============================================================
    // WRITE YOUR CODE HERE
    // ==============================================================
    //post
    app.post("/api/v1/create", async (req, res) => {
      try {
        const newData = req.body; // Use the entire request body as newData

        // Insert data into the dataCollection
        await dataCollection.insertOne(newData);

        res.status(201).json({
          success: true,
          message: "Data inserted successfully",
        });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // API to get all data from dataCollection
    app.get("/api/v1/data", async (req, res) => {
      try {
        const allData = await dataCollection.find().toArray();

        if (allData.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No data found",
          });
        }

        res.json({
          success: true,
          data: allData,
        });
      } catch (error) {
        console.error("Error fetching all data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // API to get a single data item by ID from dataCollection
    app.get("/api/v1/data/:id", async (req, res) => {
      const dataId = req.params.id;

      try {
        // Check if the provided ID is a valid MongoDB ObjectID
        if (!ObjectId.isValid(dataId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid ObjectID format",
          });
        }

        const singleData = await dataCollection.findOne({
          _id: new ObjectId(dataId),
        });

        if (!singleData) {
          return res.status(404).json({
            success: false,
            message: "Data not found",
          });
        }

        res.json({
          success: true,
          data: singleData,
        });
      } catch (error) {
        console.error("Error fetching single data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // API to delete a single data item by ID from dataCollection
    app.delete("/api/v1/data/:id", async (req, res) => {
      const dataId = req.params.id;

      try {
        // Check if the provided ID is a valid MongoDB ObjectID
        if (!ObjectId.isValid(dataId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid ObjectID format",
          });
        }

        const deleteResult = await dataCollection.deleteOne({
          _id: new ObjectId(dataId),
        });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Data not found",
          });
        }

        res.json({
          success: true,
          message: "Data deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    //updated
    app.put("/api/v1/data/:id", async (req, res) => {
      const dataId = req.params.id;
      const updatedData = req.body;

      try {
        // Check if the provided ID is a valid MongoDB ObjectID
        if (!ObjectId.isValid(dataId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid ObjectID format",
          });
        }

        const updateResult = await dataCollection.updateOne(
          { _id: new ObjectId(dataId) },
          { $set: updatedData }
        );

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Data not found",
          });
        }

        res.json({
          success: true,
          message: "Data updated successfully",
        });
      } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    //Testimonials data
    //post
    app.post("/api/v2/create", async (req, res) => {
      try {
        const newData = req.body; // Use the entire request body as newData

        // Insert data into the dataCollection
        await dataTestimonials.insertOne(newData);

        res.status(201).json({
          success: true,
          message: "Data inserted successfully",
        });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });
    // API to get all Testimonials
    app.get("/api/v2/get", async (req, res) => {
      try {
        const allData = await dataTestimonials.find().toArray();

        if (allData.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No data found",
          });
        }

        res.json({
          success: true,
          data: allData,
        });
      } catch (error) {
        console.error("Error fetching all data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // API to get a single Testimonials
    app.get("/api/v2/get/:id", async (req, res) => {
      const dataId = req.params.id;

      try {
        // Check if the provided ID is a valid MongoDB ObjectID
        if (!ObjectId.isValid(dataId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid ObjectID format",
          });
        }

        const singleData = await dataTestimonials.findOne({
          _id: new ObjectId(dataId),
        });

        if (!singleData) {
          return res.status(404).json({
            success: false,
            message: "Data not found",
          });
        }

        res.json({
          success: true,
          data: singleData,
        });
      } catch (error) {
        console.error("Error fetching single data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    //Gratitude Wall
    app.post("/api/v3/create", async (req, res) => {
      try {
        const newData = req.body; // Use the entire request body as newData

        // Insert data into the dataCollection
        await dataGratitudeWall.insertOne(newData);

        res.status(201).json({
          success: true,
          message: "Data inserted successfully",
        });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // API to get all wall data
    app.get("/api/v3/get", async (req, res) => {
      try {
        const allData = await dataGratitudeWall.find().toArray();

        if (allData.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No data found",
          });
        }

        res.json({
          success: true,
          data: allData,
        });
      } catch (error) {
        console.error("Error fetching all data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    //VOlunteer Hub POST

    app.post("/api/v4/create", async (req, res) => {
      try {
        const newData = req.body; // Use the entire request body as newData

        // Insert data into the dataCollection
        await dataVolunteer.insertOne(newData);

        res.status(201).json({
          success: true,
          message: "Data inserted successfully",
        });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // API to get all wall data
    app.get("/api/v4/get", async (req, res) => {
      try {
        const allData = await dataVolunteer.find().toArray();

        if (allData.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No data found",
          });
        }

        res.json({
          success: true,
          data: allData,
        });
      } catch (error) {
        console.error("Error fetching all data:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`🤩 Server is running on http://localhost:${port} 🤩`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const data = "SERVER RUNNING SUCCESSFULLY";
  res.json(data);
});
