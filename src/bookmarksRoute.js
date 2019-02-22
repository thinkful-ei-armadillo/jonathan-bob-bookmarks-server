'use strict';
const express = require('express');
const router = express.Router();
const BOOKMARKS = require('./bookmarks.json');
const uuid = require('uuid');

router.route('/bookmark').post((req, res) => {
  const { headers } = req;
  if (headers['content-type'] !== 'application/json') {
    return res.status(401).send('Unauthorized Request');
  }

  if (!req.body.title) {
    return res.status(400).send('title required');
  }

  if (!req.body.url) {
    return res.status(400).send('url required');
  }

  if (!req.body.rating) {
    return res.status(400).send('rating required');
  }

  if (!req.body.desc) {
    return res.status(400).send('description required');
  }
  
  let newBookmark = req.body;
  const id = uuid();
  newBookmark.id = id;

  BOOKMARKS.push(newBookmark);

  res.send(BOOKMARKS);
  
});

router.route('/bookmarks')
  .get((req, res) => {
    res.send(BOOKMARKS); //list of all bookmarks
  });
  
router.route('/bookmarks/:id')
  .get((req, res) => {
    let bookmarks = BOOKMARKS;

    let match = false;
    let i = 0;
    
    while (!match && i < bookmarks.length) {
      match = bookmarks[i].id === parseInt(req.params.id);
      i++;
    }

    if (!match) {
      res.status(404).send('Invalid ID');
    }

    bookmarks = bookmarks.filter(bookmark => {
      return bookmark.id === parseInt(req.params.id);
    });
    res.send(bookmarks); // list of specific bookmark -- 404 if invalid id
  });

module.exports = router;