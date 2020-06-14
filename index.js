const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/ele';
const dbname = 'newDatabase'        //默认建立数据库/或者连接数据库

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log('connected correctly to server');

  const db = client.db(dbname);  //数据库名称
  const collection = db.collection('teas'); //数据库下的文档集合，默认连接该文档或者建立文档
  collection.insertOne({"name": "六安瓜片", "description": "tea"}, (err, result) => { //文档下面插入文本
    assert.equal(err, null);

    console.log('after Insert:\n');
    console.log(result.ops);

    collection.find({}).toArray((err, docs) => {  // 在文档集合下查找所有文本
      assert.equal(err, null);

      console.log('Found:\n');
      console.log(docs);

      db.dropCollection('posts', (err, reslult) => {  // 删除文档集合
        assert.equal(err, null);

        client.close(); // 关闭数据库
      })
    })
  })
})