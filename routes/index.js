const router = require('express').Router();
const notes = require('./notes');

// this will initialize the routes for the end points we make
// below we will initialize the notes api route

router.use('/notes', notes);

module.exports = router;
