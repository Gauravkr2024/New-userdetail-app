const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Configure Express to listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Define route to display form
app.get('/', (req, res) => {
  res.send(`
    <form action="/" method="post">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name"><br>
      <label for="email">Email:</label><br>
      <input type="text" id="email" name="email"><br>
      <label for="phone">Phone:</label><br>
      <input type="text" id="phone" name="phone"><br>
      <label for="gender">Gender:</label><br>
      <input type="text" id="gender" name="gender"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Define route to handle form submission
app.post('/', (req, res) => {
  const { name, email, phone, gender } = req.body;
  const userDetails = `Name: ${name}, Email: ${email}, Phone: ${phone}, Gender: ${gender}\n`;
  
  // Append user details to a file
  fs.appendFile('userDetails.txt', userDetails, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error saving user details');
    } else {
      console.log('User details saved successfully');
      res.send('User details saved successfully');
    }
  });
});
