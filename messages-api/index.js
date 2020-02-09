const express = require("express");
const messages = require('./app/messages');
const cors = require('cors');
const fileDB = require('./db');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/messages', messages);

const run = async () => {
  await fileDB.init();

  app.listen(port, () => {
    console.log(`Server started on${port} port!`);
  });
  
};

run().catch(e => {
  console.log(e);
});