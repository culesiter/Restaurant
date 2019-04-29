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
            type:Number
        },
        password:{
            type:String,
            require:true
        },
        birthday:{
            type:Date
        }

    }
);
var customer=mongoose.model('customer',customerSchema);
module.exports=customer;