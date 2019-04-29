var mongoose=require("mongoose");
var monanthucdonSchema=mongoose.Schema(
    {
        _idmonan:{
            type: mongoose.Schema.Types.ObjectId, ref: 'monan',
            require: true
        },
      
        _idthucdon:{
            type: mongoose.Schema.Types.ObjectId, ref: 'thucdon',
            require:true
        },
        soluong:{
            type:Number,
            default:1
        }
    }
);
var monanthucdon=mongoose.model('monanthucdon',monanthucdonSchema);
module.exports=monanthucdon;