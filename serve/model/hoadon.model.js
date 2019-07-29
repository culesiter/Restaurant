var mongoose = require("mongoose");
var hoadonSchema = mongoose.Schema(
    {

        _idkhachhang: {
            type: mongoose.Schema.Types.ObjectId, ref: 'khachhang',
            require: true
        },
        _idnhanvien: {
            type: mongoose.Schema.Types.ObjectId, ref: 'nhanvien'
        },
        thoidiemtao: {
            type: Date,
            default: Date.now()
        },
        thoidiemden: {
            type: String
        },
        buoiDat:{
            type:Number
        },
        tongtien: {
            type: Number,
        },
        tinhtrang: {
            type: Number,
            default:0
        },
        gioden:{
            type:String
        },
        hinhthucthanhtoan: {
            type: Number
        },
        _idphong: {
            type: mongoose.Schema.Types.ObjectId, ref: 'phong',
            require: true
        }
    }
);
var hoadon = mongoose.model('hoadon', hoadonSchema);
module.exports = hoadon;