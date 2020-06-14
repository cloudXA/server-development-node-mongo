const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion'; // conFusion为collection，没有新建，有的话连接
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log(`connected correctly to serve`);

  const newDish = Dishes({
    name: '西红柿炒蛋',
    description: 'test'
  });

  newDish.save()
    .then((dish) => {
      console.log(dish);
      
      return Dishes.find({});
    })
    .then((dishes) => {
      console.log(dishes);

      return Dishes.remove({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    })
})