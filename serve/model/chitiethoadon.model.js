var mongoose = require("mongoose");
var chitiethoadonSchema = mongoose.Schema(
    {
        _idhoadon: {
            type: mongoose.Schema.Types.ObjectId, ref: 'hoadon',
            require: true
        },
        _idmonan:{
            type: mongoose.Schema.Types.ObjectId, ref: 'monan'
        },
        _idthucdon:{
            type: mongoose.Schema.Types.ObjectId, ref: 'thucdon'
        },
        soluongmonan:{
            type:Number
        },
        soluongthucdon:{
            type:Number
        }

    }
);
var chitiethoadon= mongoose.model('chitiethoadon', chitiethoadonSchema);
module.exports = chitiethoadon;