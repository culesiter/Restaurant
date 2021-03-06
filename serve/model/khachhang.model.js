var mongoose=require("mongoose");
var khachhangSchema=mongoose.Schema(
    {
        ten:{
            type:String,
            require:true
        },
        email:{
            type:String

        },
        sdt:{
            type:String
        },
        matkhau:{
            type:String,
        },
        hinhanh:{
            type:String
        },
        diachi:{
            type:String
        },
        thanhvien:{
            type:Boolean,
            default:false
        },
        diem:{
            type:Number,
            default:0
        }

    }
);
var khachhang=mongoose.model('khachhang',khachhangSchema);
module.exports=khachhang;