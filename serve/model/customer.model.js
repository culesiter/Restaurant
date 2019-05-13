var mongoose=require("mongoose");
var customerSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String

        },
        phone:{
            type:String
        },
        password:{
            type:String,
        },
        birthday:{
            type:Date
        }

    }
);
var customer=mongoose.model('customer',customerSchema);
module.exports=customer;