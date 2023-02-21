const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopolcdogy: true,
});

// Define a schema for the data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: Date,
  address: String,
  gender: String,
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Handle POST requests to '/submit'
app.post('/submit', (req, res) => {
  // Create a new user object with the data from the form
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    address: req.body.address,
    gender: req.body.gender,
  });

  // Save the user object to the database
  user.save()
    .then(() => {
      res.send('User saved to database');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving user to database');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
