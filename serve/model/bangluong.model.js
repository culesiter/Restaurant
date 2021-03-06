var mongoose = require("mongoose");
var bangluongSchema = mongoose.Schema(
    {
        _idnhanvien: {
            type: mongoose.Schema.Types.ObjectId, ref: 'nhanvien'
        },
        songaylam: {
            type: Number,
            require: true
        },
        luongtheongay: {
            type: Number
        },
        cap:{
            type: String
        },
        tongluong: {
            type: Number
        },
        ngaytinh: {
            type: String
        },
        thangtra: {
            type: String
        },
        namtra: {
            type: String
        }
        ,
        ghichu: {
            type: String
        }
    }
);
var bangluong = mongoose.model('bangluong', bangluongSchema);
module.exports = bangluong;