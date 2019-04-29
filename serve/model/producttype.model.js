var mongoose=require("mongoose");
var producttypeSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        count:{
            type:Number,
            default:1
        }
    }
);
var producttype=mongoose.model('producttype',producttypeSchema);
module.exports=producttype;