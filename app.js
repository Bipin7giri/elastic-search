// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config(); // Load environment variables from .env
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use('/api', require('./src/routes/products.js'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
