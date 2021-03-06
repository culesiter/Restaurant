var mongoose=require("mongoose");
var nhanvienSchema=mongoose.Schema(
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
            require:true
        },
        hinhanh:{
            type:String
        },
        _idcapnhanvien:{
            type: mongoose.Schema.Types.ObjectId, ref: 'capnhanvien',
            require:true
        },

    }
);
var nhanvien=mongoose.model('nhanvien',nhanvienSchema);
module.exports=nhanvien;