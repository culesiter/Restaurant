
const thucdonmonan = require("../model/chitietthucdonmonan.model")
const hoadon = require("../model/hoadon.model");
const phong = require("../model/phong.model");
const dichvu = require("../model/dichvu.model");
const chitiethoadon = require("../model/chitiethoadon.model");
const chitietdichvu = require("../model/chitietdichvu.model");
const nhanvien = require("../model/nhanvien.model");
const capnhanvien = require("../model/capnhanvien.model");
const bangluong = require("../model/bangluong.model");
const lichlam = require("../model/lichlam.model");
const mongoose = require("mongoose")
module.exports = {
    taolichlam: taolichlam,
    laylichlam: laylichlam,
    xoalichlam: xoalichlam,
    laylichlamtheoid: laylichlamtheoid
}
function xoalichlam(request) {
    return new Promise((resolve, reject) => {
        bangluong.remove({ _id: request.id }).then(res => {
            var mes = {
                message: "xoa thanh cong",
                message_2: res
            }
            resolve(mes);
        }).catch(err => {
            var err = {
                err: err + ""
            }
            reject(err);
        }
        )
    });
}
function laylichlam() {
    return new Promise((resolve, reject) => {
        lichlam.find({}).select('_id _idnhanvien thulam ngaynghi thang nam tinhtrang').populate('_idnhanvien').exec(
            function (err, response) {
                if (err) {
                    var err = {
                        err: err
                    }
                    reject(err)
                } else {
                    var data = response.map(res => {
                        return {
                            _id: res._id,
                            _idnhanvien: res._idnhanvien,
                            thulam: res.thulam,
                            ngaynghi: res.ngaynghi,
                            thang: res.thang,
                            nam: res.nam,
                            tinhtrang: res.tinhtrang
                        }
                    }

                    )
                    resolve(data);
                }
            })


    });
}
function laylichlamtheoid(req) {
    console.log(req.id)
    return new Promise((resolve, reject) => {
        lichlam.find({ _idnhanvien: req.id }).select('_id _idnhanvien thulam ngaynghi thang nam tinhtrang').populate('_idnhanvien').exec(
            function (err, response) {
                if (err) {
                    var err = {
                        err: err
                    }
                    reject(err)
                } else {
                    var data = response.map(res => {
                        return {
                            _id: res._id,
                            _idnhanvien: res._idnhanvien,
                            thulam: res.thulam,
                            ngaynghi: res.ngaynghi,
                            thang: res.thang,
                            nam: res.nam,
                            tinhtrang: res.tinhtrang
                        }
                    }

                    )
                    resolve(data);
                }
            })


    });
}
function taolichlam(request) {
    return new Promise((resolve, reject) => {
        var lichlammoi = new lichlam({
            _idnhanvien: request._idnhanvien,
            thulam: request.thulam,
            ngaynghi: request.ngaynghi,
            thang: request.thang,
            nam: request.nam,
            tinhtrang: request.tinhtrang
        });
        console.log(lichlammoi);
        lichlammoi.save().then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,

                }
            }
            resolve(data);

        }).catch(err => {
            var err = { err: err + "" }
            reject(err);
        })
    }
    )
}     