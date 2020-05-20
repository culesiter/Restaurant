var mongoose=require("mongoose");
var monanSchema=mongoose.Schema(
    {
        ten:{
            type:String,
            require: true
        },
        gia:{
            type: Number,
            require: true
        },
        _idloai:{
            type: mongoose.Schema.Types.ObjectId, ref: 'loaimonan',
            require:true
        },
       hinhanh:{
           type:String,
           require:true
       },
       khuyenmai:{
        type:Number,
        default:0
       },
       mota:{
           type:String
       }
    }
);
var monan=mongoose.model('monan',monanSchema);
module.exports=monan;