const express = require('express');
const fileDB = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await fileDB.getMessages();
  const dateQuery = req.query.datetime;
  const dateCorrect = new Date(dateQuery);
  let massagesGetFromLastDate = [];
  const errorMessage = {"error": "No correct date"};

  if (!dateQuery) {
    res.send(items);
  } else {
    if (isNaN(dateCorrect.getDate()) === true) {
      res.status(400).send(errorMessage);
    } else {
      items.forEach(item => {
        if(item.datetime > dateQuery) {
          massagesGetFromLastDate.push(item);
        }
      });
      res.send(massagesGetFromLastDate);
    }
  }

});

router.post('/', async (req, res) => {
  const errorMessage =  {"error": "Author and message must be present in the request"};
  if (!req.body.author || !req.body.message) {
    res.status(400).send(errorMessage);
  } else {
    await fileDB.addMessage(req.body);
    res.send({id: req.body.id, datetime: req.body.datetime});
  }
});

module.exports = router;