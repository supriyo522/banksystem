const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// In-memory database (replace with a persistent one for production)
const db = new Datastore();

const cardRoutes = require('./route/card.route');


app.use('/api', cardRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
