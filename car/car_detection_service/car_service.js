var mongoose = require('mongoose');

//car2smarthome/service/webos_service

function connectDB(){
    mongoose
    .connect(
      'mongodb+srv://yuda:iIG3apUareiA6nDN@cluster0.f2xfsyh.mongodb.net/carDB?retryWrites=true&w=majority'
    )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.log(err);
    });
}

function carSchema(){
    //car 일반차량
    //https://www.mongodb.com/docs/manual/tutorial/expire-data/
    carModel = mongoose.Schema({
        category: {type: String, require: true},
        carNumber: {type: String, require: true},
        createdAt:{type: Date, default: Date.now},
        expiredAt: {type: Date, expires: 0}
    });

    var Car = mongoose.model('car', carModel);
    return Car
}

//carSchema에서 return한 Car 값이 여기로 와야 하는데
function showCarData(Car){
    Car.find({})                 
  .sort('-createdAt') //createdAt순서대로 정렬(내림차순이라 -붙음)           
  .exec(function(err, cars){  
    console.log(cars);  
    if(err) return res.json(err);
  });
}

function createGeneralCar(Car, category, carNumber){
  var generalCar = new Object();
  generalCar.category = category;
  generalCar.carNumber = carNumber;
    Car.create(generalCar, function(err, post){
      if(err) return res.json(err);
      });
}

function createRegisterCar(Car, category, carNumber){
  var registerCar = new Object();
  registerCar.category = category;
  registerCar.carNumber = carNumber;
    Car.create(registerCar, function(err, post){
      if(err) return res.json(err);
      });
}

function deleteCarData(Car){
    Car.deleteOne({_id:req.params.id}, function(err){
        if(err) return res.json(err);
      });
}

connectDB();
var car = carSchema();
createGeneralCar(car, "general", "12가 1234");
createRegisterCar(car, "register", "34가 3456");
showCarData(car);