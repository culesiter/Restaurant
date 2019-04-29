const thucdon = require("./../model/thucdon.model");
const monan = require("./../model/monan.model")
const thucdonmonan = require("./../model/chitietthucdonmonan.model")
const moment = require('moment');

const hoadon = require("./../model/hoadon.model");
const khachhang = require("./../model/khachhang.model");
const phong = require('./../model/phong.model')
const mongoose = require("mongoose")
module.exports = {
    taoHoaDon: taoHoaDon,
    layHoaDon: layHoaDon,
    xoaHoaDon: xoaHoaDon,
    updateProduct: updateProduct,
    layHoaDonTheoDay: layHoaDonTheoDay
}
function layHoaDonTheoDay(req) {
    return new Promise((resolve, reject) => {
        hoadon.find({}).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang buoiDat').populate('_idkhachhang', 'ten').exec(
            function (err, response) {
                if (err) {
                    var err = {
                        err: err
                    }
                    reject(err)
                } else {
                    var data = response.filter(res => {
                        var caseA = caseB = false;
                        caseA = moment(new Date(res.thoidiemden)).format("DD/MM/YYYY") == moment(new Date(req.thoidiemden)).format("DD/MM/YYYY");
                        return caseA;
                    })
                    resolve(data);
                }
            })
    });
}
function xoaHoaDon(request) {
    return new Promise((resolve, reject) => {
        hoadon.remove({ _id: request.id }).exec(function (err, response) {
            if (err) {
                reject(err + "");
            } else {
                var mes = {
                    message: "xoa thanh cong"
                }
                resolve(mes);
            }
        });
    });
}

function updateProduct(pramas, request) {

    return new Promise((resolve, reject) => {

        brand.findById(request._idbrand).then(
            res => {
                if (!res) {
                    var err = {
                        message: "brand not found"
                    }
                    reject(err)
                }
                else if (res) {
                    return typeproduct.findById(request._idtypeproduct)
                }
            }
        ).then(tp => {
            if (!tp) {
                var err = {
                    message: "typeproduct not found"
                }
                reject(err)
            }
            else if (tp) {
                return product.findById({ _id: pramas.id })
            }
        }).then(res => {
            if (!res) {
                var err = {
                    message: "product not found"
                }
                reject(err)
            }
            else if (res) {
                res.name = request.name
                res.img = request.img
                res.price = request.price
                res._idtypeproduct = request._idtypeproduct
                res.discount = request.discount
                res._idbrand = request._idbrand

                return res.save()
            }
        }).then(result => {
            const data = {
                message: "product updated",
                values: {
                    _id: result._id,
                    name: result.name,
                    img: result.img,
                    price: result.price,
                    _idtypeproduct: result._idtypeproduct,
                    discount: result.discount,
                    _idbrand: result._idbrand
                }
            }
            resolve(data);

        }).catch(err => {
            reject(err + "");
        })
    })

}
function layHoaDon() {
    return new Promise((resolve, reject) => {
        hoadon.find({}).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang buoiDat ').populate('_idkhachhang', 'ten').exec(
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
                            ten: res._idkhachhang.ten,
                            thoidiemtao: res.thoidiemtao,
                            thoidiemden: moment(new Date(res.thoidiemden)).format("DD/MM/YYYY"),
                            tinhtrang: res.tinhtrang,
                            buoiDat:res.buoiDat
                        }
                    }

                    )

                    resolve(data);
                }
            })
    });
}
function taoHoaDon(request) {

console.log(request);


    var hoadonmoi = new hoadon({
        _idkhachhang: request._idkhachhang,
        thoidiemden: request.thoidiemden,
        tinhtrang: request.tinhtrang,
        hinhthucthanhtoan: request.hinhthucthanhtoan,
        _idphong: request._idphong,
        buoiDat:request.buoiDat
    });
    return new Promise((resolve, reject) => {
        phong.findById(request._idphong).exec().then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai khách hàng trên"
                    }
                    reject(err)
                }
                else if (res) {
                    return khachhang.findById(request._idkhachhang)
                }
            }
        ).then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai khách hàng trên"
                    }
                    reject(err)
                }
                else if (res) {
                    return hoadonmoi.save()
                }
            }
        ).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id
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