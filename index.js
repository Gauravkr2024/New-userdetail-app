const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, gender } = req.body;
  const userDetails = `Name: ${name}, Email: ${email}, Phone: ${phone}, Gender: ${gender}\n`;

  // Append user details to a file
  fs.appendFile('user_details.txt', userDetails, (err) => {
    if (err) {
      console.error('Error saving user details:', err);
      res.status(500).send('Error saving user details');
    } else {
      console.log('User details saved successfully');
      res.status(200).send('User details saved successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
