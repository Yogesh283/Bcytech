import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});



app.post('/submit', async (req, res) => {
    try {
      console.log('Received data:', req.body);
  
      const newData = new MyModel(req.body);
      await newData.save();
      
      console.log('Data saved successfully in MongoDB!');
      res.status(200).send('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(400).send('Error: ' + error.message);
    }
  });

  
  
