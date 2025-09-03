import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
const mongoURI = 'mongodb://localhost:27017';  // Replace with your MongoDB URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema and model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 8
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema); 

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const { username, password } = req.body;

    // Create a new user document
    const newUser = new User({ username, password });

    // Save the document to the database
    await newUser.save();

    res.send('User saved to database');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error saving user');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

