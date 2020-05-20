var mongoose=require("mongoose");
var loaimonanSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        ten:{
            type:String,
            require: true
        },
        mota:{
            type:String,
            default:'Vị Rất Ngon'
        }
    }
);
var loaimonan=mongoose.model('loaimonan',loaimonanSchema);
module.exports=loaimonan;