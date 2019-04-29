var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var data = mongoose.connect('mongodb://manh:manh1997*@restaurant-shard-00-00-oek06.mongodb.net:27017,restaurant-shard-00-01-oek06.mongodb.net:27017,restaurant-shard-00-02-oek06.mongodb.net:27017/test?ssl=true&replicaSet=restaurant-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true }).then(
    () => {
        console.log('conect sucessfully');
    }


).catch(Error => console.log('conect failed:' + Error + "")
);

module.exports = data;