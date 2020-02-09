const fs = require('fs');
const nanoid = require('nanoid');
const filename = './db.json';

const readFile = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

let data = [];

module.exports = {
  async init() {
    try {
      const fileContents = await readFile(filename);
      data =JSON.parse(fileContents.toString());
    } catch (e) {
      console.log('Could not read file' + filename);
      data = [];
    }
  },
  async getMessages() {
    return data.slice(-30);
  },
  async addMessage(item) {
    item.id = nanoid();
    item.datetime = new Date().toISOString();
    data.push(item);
    await this.save();
  },
  async save() {
    const fileContents = JSON.stringify(data, null, 2);
    await writeFile(filename, fileContents);
  }

};