const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

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
  } else {
    res.error('There was an error adding a note');
  }
});

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  const title = req.params.title;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const data = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', data);
      res.json(`${title} has been successfully deleted`);
    });
});

module.exports = notes;
