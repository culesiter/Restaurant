var mongoose=require("mongoose");
var loainguoidungSchema=mongoose.Schema(
    {
        chucvu:{
            type:String,
            require: true
        },
        mota:{
            type:String
        }
    }
);
var loainguoidung=mongoose.model('loainguoidung',loainguoidungSchema);
module.exports=loainguoidung;