const express = require('express');
const path = require('path');
const api = require('./routes/index');

// sets the default port
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializing the api route to be used throughout the app
app.use('/api', api);

// sets the static files directory to public
app.use(express.static('public'));

// setting the top root to be index.html in public
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// setting the notes route to point to the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// fall back if any other route is added in
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`App started on http://localhost:${PORT}`));
