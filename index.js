import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import MyModel from './model.js'; // Ensure MyModel is correctly exported from model.js


// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://Yogesh:umiun9O2PYgpJwf9@cluster0.ib5py.mongodb.net/';

// Connect to MongoDB
mongoose.connect(uri, { 
  serverSelectionTimeoutMS: 30000, // 30 seconds
  connectTimeoutMS: 30000, // 30 seconds
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request to the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Assuming you have an index.html file in your public directory
});

app.post('/submit', async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const newData = new MyModel(req.body);
    await newData.save();

    console.log('Data saved successfully in MongoDB!');
    
    // Serve pop.html after successful submission
    res.sendFile(path.join(__dirname, 'public', 'pop.html'));
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(400).send('Error: ' + error.message); // Send the error message as the response
  }
});





