const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation');

const url = 'mongodb://127.0.0.1:27017/ele';
const dbname = 'newDatabase'        //默认建立数据库/或者连接数据库


MongoClient.connect(url).then((client) => {
  console.log('Connected correctly to server');
  const db = client.db(dbname);

  dboper.insertDocument(db, { name: '张祥', description: 'test'}, 'author')
    .then((result) => {
      console.log('insert Document;\n', result.ops);

      return dboper.findDocuments(db, 'author')
    })
    .then((docs) => {
      console.log('found Document:\n', docs);

      return dboper.updateDocument(db, { name: '张祥'}, { name: '张灿', description: 'no test'}, 'author')
    })
    .then((result) => {
      console.log('update document:\n', result.result);

      return dboper.findDocuments(db, 'author')
    })
    .then((docs) => {
      console.log('found updated document:\n', docs);

      return db.dropCollection('author')
    })
    .then((result) => {
      console.log('dropped collection:', result);
      client.close();
    })

})