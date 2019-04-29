var mongoose = require("mongoose");
var chitietdichvuSchema = mongoose.Schema(
    {
        _iddichvu: {
            type: mongoose.Schema.Types.ObjectId, ref: 'dichvu',
            require: true
        },
        _idchitiethoadon: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chitiethoadon',
            require: true
        }

    }
);
var chitietdichvu = mongoose.model('chitietdichvu', chitietdichvuSchema);
module.exports = chitietdichvu;