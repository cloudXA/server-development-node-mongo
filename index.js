const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation');

const url = 'mongodb://127.0.0.1:27017/ele';
const dbname = 'newDatabase'        //默认建立数据库/或者连接数据库

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log('connected correctly to server');

  const db = client.db(dbname);  //数据库名称
  const collection = db.collection('teas'); //数据库下的文档集合，默认连接该文档或者建立文档
  dboper.insertDocument(db, {name: '张祥', description: 'Test'}, 'author', (result) => {
    console.log('insert Document;\n', result.ops);

    dboper.findDocuments(db, 'author', (docs) => {
      console.log('found Document:\n', docs);

      dboper.updateDocument(db, { name: '张祥'}, { name: '张灿', description: 'no test'}, 'author', (result) => { //将张祥对应的文本替换为张灿
        console.log('update document:\n', result.result);

        dboper.findDocuments(db, 'author', (docs) => {
          console.log('found updated document:\n', docs);

          db.dropCollection('author', (result) => {
            console.log('dropped collection:', result);
            client.close();
          })
        })
      })
    })
  })
})