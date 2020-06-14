const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion'; // conFusion为collection，没有新建，有的话连接
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log(`connected correctly to serve`);

    Dishes.create({
      name: '番茄牛腩fan',
      description: 'test'
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(dish._id, { //更新document
        $set: { description: 'Update test'}
      }, {
        new: true
      })
      .exec();
    })
    .then((dish) => {                   //给关联schema添加数据
      console.log(dish);

      dish.comments.push({
        rating: 5, 
        comment: '不好吃',
        author: '张祥'
      });
      return dish.save();
    })
    .then((dish) => { 
      console.log(dish);

      return Dishes.remove({});    //移除collections中的document
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    })
})