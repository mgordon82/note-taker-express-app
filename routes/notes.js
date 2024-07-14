const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// utilizing these helpers to help read, append to and write to a file
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// this route will get all the items in the db.json file
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// this route will post a new note to the db.json file
notes.post('/', (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
    res.json('Note has been added successfully');
    console.info('Note has been added successfully');
  } else {
    res.error('There was an error adding a note');
    console.info('There was an error adding a note');
  }
});

// this route will take an id of a note and remove it from
// the db.json file
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  const title = req.params.title;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const data = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', data);
      res.json(`${title} has been successfully deleted`);
      console.info(`${title} has been successfully deleted`);
    });
});

module.exports = notes;
