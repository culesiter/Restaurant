const thucdon = require("./../model/thucdon.model");
const monan = require("./../model/monan.model")
const thucdonmonan = require("./../model/chitietthucdonmonan.model");

const moment = require('moment');
const chitiethoadon=require('./../model/chitiethoadon.model');
const hoadon = require("./../model/hoadon.model");
const khachhang = require("./../model/khachhang.model");
const phong = require('./../model/phong.model')
const mongoose = require("mongoose")
module.exports = {
    taoHoaDon: taoHoaDon,
    layHoaDon: layHoaDon,
    xoaHoaDon: xoaHoaDon,
    layHoaDonTheoDay: layHoaDonTheoDay,
    layHoaDonNguoiDung:layHoaDonNguoiDung,
    layHoaDonId:layHoaDonId,
    huyHoaDonId:huyHoaDonId,
    suaHoaDon:suaHoaDon

}

function layHoaDonTheoDay(req) {
    return new Promise((resolve, reject) => {
        hoadon.find({}).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang buoiDat _idphong').populate('_idkhachhang', 'ten').populate('_idphong').exec(
            function (err, response) {
                if (err) {
                    var err = {
                        err: err
                    }
                    reject(err)
                } else {
                    var data = response.filter(res => {
                        if (res.thoidiemden == req.thoidiemden) {
                            return res;
                        }
                    })
                    resolve(data);
                }
            })
    });
}
function huyHoaDonId(request){
    return new Promise((resolve, reject) => {
        hoadon.findOne({ _id: request.id }).exec(function (err, response) {
            if (err) {
                var err = {
                    message: "khong tim thay"
                }
                reject(err);
            } else {
                response.tinhtrang=-1
                return response.save()
            }
        }).then(result=>{
            const data = {
                message: "da huy",
                values: {
                    tinhtrang:result.tinhtrang
                }
            }
            resolve(data);
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
                    message: "Xóa thành công!"
                }
                resolve(mes);
            }
        });
    });
}

function suaHoaDon(pramas, request) {
    console.log(pramas)

    return new Promise((resolve, reject) => {
        hoadon.findOne({ _id: pramas.id }).exec(function (err, response) {
            if (err) {
                var err = {
                    message: "khong tim thay"
                }
                reject(err);
            } else {
                response.tinhtrang=request.action;
                response.save(function(err, result) {
                    if (err) throw err;
            
                    if(result) {
                        const data = {
                            message: "thanh cong",
                            values: {
                                tinhtrang:result.tinhtrang
                            }
                        }
                        resolve(data);
                    }
                })
            }
        })
    });
   
}
function layHoaDonId(request) {
    return new Promise((resolve, reject) => {
    hoadon.find({ _id: request.id }).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang _idphong gioden buoiDat tongtien').populate('_idkhachhang', 'ten').populate('_idphong').exec(
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
                        thoidiemtao: moment(new Date(res.thoidiemtao)).format("DD/MM/YYYY"),
                        thoidiemden: res.thoidiemden,
                        tinhtrang: res.tinhtrang,
                        buoiDat: res.buoiDat,
                        _idphong: res._idphong,
                        tongtien:res.tongtien,
                        gioden:res.gioden,
                        hinhthucthanhtoan:res.hinhthucthanhtoan
                    }
                }
                )
                resolve(data);
            }
        })
    });
}
function layHoaDonNguoiDung(request) {
    return new Promise((resolve, reject) => {
    hoadon.find({ _idkhachhang: request.idkh }).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang _idphong gioden buoiDat tongtien').populate('_idkhachhang', 'ten').populate('_idphong').exec(
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
                        thoidiemtao: moment(new Date(res.thoidiemtao)).format("DD/MM/YYYY"),
                        thoidiemden: res.thoidiemden,
                        tinhtrang: res.tinhtrang,
                        buoiDat: res.buoiDat,
                        _idphong: res._idphong,
                        tongtien:res.tongtien,
                        gioden:res.gioden,
                        hinhthucthanhtoan:res.hinhthucthanhtoan
                    }
                }
                )
                resolve(data);
            }
        })
    });
}
function layHoaDon() {
    return new Promise((resolve, reject) => {
        hoadon.find({}).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang _idphong buoiDat gioden tongtien').populate('_idkhachhang', 'ten').populate('_idphong').exec(
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
                            thoidiemden:res.thoidiemden,
                            tinhtrang: res.tinhtrang,
                            buoiDat: res.buoiDat,
                            _idphong: res._idphong,
                            tongtien:res.tongtien,
                            gioden:res.gioden,
                            hinhthucthanhtoan:res.hinhthucthanhtoan
                        }
                    }
                    )
                    resolve(data);
                }
            })
    });
   
}
function taoHoaDon(request) {
    var hoadonmoi = new hoadon({
        _idkhachhang: request._idkhachhang,
        thoidiemden: request.thoidiemden,
        tinhtrang: request.tinhtrang,
        hinhthucthanhtoan: request.hinhthucthanhtoan,
        _idphong: request._idphong,
        buoiDat: request.buoiDat,
        tongtien:request.tongtien,
        gioden:request.gioden,
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
            console.log(result)
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