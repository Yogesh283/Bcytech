const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
});

// Sample route to handle data from front-end
app.post('/submit-data', (req, res) => {
    // Data received from front-end
    const data = req.body;
    console.log('Data received:', data);

    // Save data to MongoDB (assuming a model is created)
    // Example:
    // const MyModel = mongoose.model('MyModel', new mongoose.Schema({ name: String, email: String }));
    // const newData = new MyModel(data);
    // newData.save().then(() => res.send('Data saved to MongoDB')).catch(err => res.status(500).send(err));

    res.send('Data received on server');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
