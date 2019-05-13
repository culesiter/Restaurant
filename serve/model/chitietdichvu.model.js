var mongoose = require("mongoose");
var chitietdichvuSchema = mongoose.Schema(
    {
        _iddichvu: {
            type: mongoose.Schema.Types.ObjectId, ref: 'dichvu',
            require: true
        },
        _idhoadon: {
            type: mongoose.Schema.Types.ObjectId, ref: 'hoadon',
            require: true
        }

    }
);
var chitietdichvu = mongoose.model('chitietdichvu', chitietdichvuSchema);
module.exports = chitietdichvu;