var mongoose = require("mongoose");
var chitietmonanSchema = mongoose.Schema(
    {
        _idmonan: {
            type: mongoose.Schema.Types.ObjectId, ref: 'monan',
            require: true
        },
        _idthucdon: {
            type: mongoose.Schema.Types.ObjectId, ref: 'thucdon',
            require: true
        },
        _idchitiethoadon: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chitiethoadon',
            require: true
        }

    }
);
var chitietmonan= mongoose.model('chitietmonan', chitietmonanSchema);
module.exports = chitietmonan;