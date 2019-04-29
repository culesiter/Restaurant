var mongoose=require("mongoose");
var thucdonSchema=mongoose.Schema(
    {
        ten:{
            type:String,
            require: true
        },
        khuyenmai:{
            type:Number,
            default:0
        }

    }
);
var thucdon=mongoose.model('thucdon',thucdonSchema);
module.exports=thucdon;