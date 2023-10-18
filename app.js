// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://bipin7giri:IRLouttbnPzptFnk@cluster0.2d9ffmd.mongodb.net/elastic_search', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use('/api', require('./src/routes/products.js'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
