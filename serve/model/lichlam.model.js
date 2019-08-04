var mongoose = require("mongoose");
var lichlamSchema = mongoose.Schema(
    {
        _idnhanvien: {
            type: mongoose.Schema.Types.ObjectId, ref: 'nhanvien'
        },
        thulam: {
            type: Array
        },
        ngaynghi: {
            type: Number
        },
        thang: {
            type: Number
        },
        nam: {
            type: Number
        },
        tinhtrang: {
            type: Number
        }
    }
);
var lichlam = mongoose.model('lichlam', lichlamSchema);
module.exports = lichlam;