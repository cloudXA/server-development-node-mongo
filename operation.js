const assert = require('assert');

// 在collection中插入document
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.insert(document, (err, result) => {
    assert.equal(err, null);
    console.log(`Inserted ${result.result.n} documents into the collection ${collection} `);
    callback(result)
  });
};

// 查找collection下所有的document
exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
};

// 删除collection下的document
exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => {
    assert.equal(err, null);
    console.log(`removed the document`, document);
    callback(result);
  })
}

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null);
    console.log('update the document with', update);
    callback(result);
  });
};
