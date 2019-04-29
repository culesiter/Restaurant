var mongoose=require("mongoose");
var userSchema=mongoose.Schema(
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
            require:true
        },
        birthday:{
            type:Date
        }

    }
);
var user=mongoose.model('user',userSchema);
module.exports=user;