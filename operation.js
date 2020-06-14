const assert = require('assert');

// 在collection中插入document
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.insert(document);
};

// 查找collection下所有的document
exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

// 删除collection下的document
exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document)
}

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
