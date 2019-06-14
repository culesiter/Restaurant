var mongoose = require("mongoose");
var capnhanvienSchema = mongoose.Schema(
    {
        cap: {
            type: String,
            require: true
        },
        luongtheongay: {
            type: Number,
            require: true
        }

    }
);
var capnhanvien = mongoose.model('capnhanvien', capnhanvienSchema);
module.exports = capnhanvien;