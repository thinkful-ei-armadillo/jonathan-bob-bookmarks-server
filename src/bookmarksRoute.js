const express = require('express');
const router = express.Router();
const BOOKMARKS = require('./bookmarks.json');

 
router.route('/bookmarks')
  .get((req, res) => {
    res.send(BOOKMARKS) //list of all bookmarks
  })
  
router.route('/bookmarks/:id')
  .get((req, res) => {
    let bookmarks = BOOKMARKS;

    let match = false;
    let i = 0;
    
    while(!match && i < bookmarks.length) {
      match = bookmarks[i].id === parseInt(req.params.id);
      i++
    }

    if (!match) {
      res.status(404).send('Invalid ID')
    }

    bookmarks = bookmarks.filter(bookmark => {
      return bookmark.id === parseInt(req.params.id);
    })
    res.send(bookmarks) // list of specific bookmark -- 404 if invalid id
})

module.exports = router;