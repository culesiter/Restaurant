const thucdon = require("./../model/thucdon.model");
const monan = require("./../model/monan.model")
const thucdonmonan = require("./../model/chitietthucdonmonan.model");

const moment = require('moment');
const chitiethoadon = require('./../model/chitiethoadon.model');
const hoadon = require("./../model/hoadon.model");
const khachhang = require("./../model/khachhang.model");
const phong = require('./../model/phong.model')
const mongoose = require("mongoose")
module.exports = {
    taoHoaDon: taoHoaDon,
    layHoaDon: layHoaDon,
    xoaHoaDon: xoaHoaDon,
    layHoaDonTheoDay: layHoaDonTheoDay,
    layHoaDonNguoiDung: layHoaDonNguoiDung,
    layHoaDonId: layHoaDonId,
    huyHoaDonId: huyHoaDonId,
    suaHoaDon: suaHoaDon

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
                        if (res.thoidiemden == req.thoidiemden && res.tinhtrang != -1) {
                            return res;
                        }
                    })
                    console.log(data);
                    resolve(data);
                }
            })
    });
}
function huyHoaDonId(request) {
    return new Promise((resolve, reject) => {
        hoadon.findOne({ _id: request.id }).exec(function (err, response) {
            if (err) {
                var err = {
                    message: "khong tim thay"
                }
                reject(err);
            } else {
                response.tinhtrang = -1
                return response.save()
            }
        }).then(result => {
            const data = {
                message: "da huy",
                values: {
                    tinhtrang: result.tinhtrang
                }
            }
            resolve(data);
        })
    });
}
function xoaHoaDon(request) {
    return new Promise((resolve, reject) => {
        chitiethoadon.deleteMany({ _idhoadon: request.id }).then(res => {
            console.log(res)
            return hoadon.remove({ _id: request.id })
        }).then(res => {
            var mes = {
                message: "Xóa thành công!"
            }
            resolve(mes);
        }).catch(err => {
            var err = { err: err + "" }
            reject(err);
        })

    });
}

function suaHoaDon(pramas, request) {
    console.log(request)

    return new Promise((resolve, reject) => {
        hoadon.findOne({ _id: pramas.id }).exec(function (err, response) {
            if (err) {
                var err = {
                    message: "khong tim thay"
                }
                reject(err);
            } else {
                response.gioden=request.gioden||response.gioden
                response._idphong=request._idphong||response._idphong
                response.buoiDat=request.buoiDat||response.buoiDat
                response.thoidiemden=request.thoidiemden|| response.thoidiemden
                response.tinhtrang = request.action || response.tinhtrang;
                response.hinhthucthanhtoan = request.hinhthucthanhtoan || response.hinhthucthanhtoan;
                response.save(function (err, result) {
                    if (err) throw err;

                    if (result) {
                        const data = {
                            message: "thanh cong",
                            values: {
                                tinhtrang: result.tinhtrang,
                                hinhthucthanhtoan: result.hinhthucthanhtoan
                            }
                        }
                        console.log(result)
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
                            tongtien: res.tongtien,
                            gioden: res.gioden,
                            hinhthucthanhtoan: res.hinhthucthanhtoan
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
        hoadon.find({ _idkhachhang: request.idkh }).sort({ _id: -1 }).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang _idphong gioden buoiDat tongtien').populate('_idkhachhang').populate('_idphong').exec(
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
                            _idkhachhang: res._idkhachhang,
                            thoidiemtao: moment(new Date(res.thoidiemtao)).format("DD/MM/YYYY"),
                            thoidiemden: res.thoidiemden,
                            tinhtrang: res.tinhtrang,
                            buoiDat: res.buoiDat,
                            _idphong: res._idphong,
                            tongtien: res.tongtien,
                            gioden: res.gioden,
                            hinhthucthanhtoan: res.hinhthucthanhtoan
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
        hoadon.find({}).sort({ _id: -1 }).select('_id thoidiemden thoidiemtao hinhthucthanhtoan tinhtrang _idkhachhang _idphong buoiDat gioden tongtien').populate('_idkhachhang').populate('_idphong').exec(
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
                            _idkhachhang: res._idkhachhang,
                            thoidiemtao: res.thoidiemtao,
                            thoidiemden: res.thoidiemden,
                            tinhtrang: res.tinhtrang,
                            buoiDat: res.buoiDat,
                            _idphong: res._idphong,
                            tongtien: res.tongtien,
                            gioden: res.gioden,
                            hinhthucthanhtoan: res.hinhthucthanhtoan
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
        tongtien: request.tongtien,
        gioden: request.gioden,
    });
    return new Promise((resolve, reject) => {
        hoadon.find({ thoidiemden: request.thoidiemden, tinhtrang: { $nin: [-1] }, _idphong: request._idphong, buoiDat: request.buoiDat }).then(res => {
            console.log('res', res.length);
                    
            if (res.length != 0) {
                var err = {
                    message: "bi chiem"
                }
                console.log(err);
                
                return reject(err)
            } else if (res.length == 0) {
                console.log(1);
                return hoadonmoi.save()
            }

        }).then(result => {
            if (result) {
                console.log(2);
                
                const data = {
                    message: "luu thanh cong",
                    values: {
                        _id: result._id
                    }
                }
                resolve(data);
            }
        }).catch(err => {
            var err = { err: err + "" }
            reject(err);
        })
    }
    )
}     