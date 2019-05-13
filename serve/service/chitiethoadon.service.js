
const thucdonmonan = require("./../model/chitietthucdonmonan.model")

const hoadon = require("./../model/hoadon.model");
const monan = require("./../model/monan.model");
const thucdon = require("./../model/thucdon.model");
const phong = require("./../model/phong.model");
const chitiethoadon = require("./../model/chitiethoadon.model");
const mongoose = require("mongoose")
module.exports = {
    taoChiTietHoaDon: taoChiTietHoaDon,
    layChiTietHoaDon: layChiTietHoaDon,
    getProductById: getProductById,
    xoaChiTietHoaDon: xoaChiTietHoaDon,
    updateProduct: updateProduct
}
function xoaChiTietHoaDon(request) {
    return new Promise((resolve, reject) => {
        
        chitiethoadon.remove({ _idhoadon: request.id })
            
        .then(res => {
            var mes = {
                message: "xoa thanh cong"
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
function getProductById(req) {
    return new Promise((resolve, reject) => {
        product.findOne({ _id: req.id }).select('_id name img price discount _idtypeproduct _idbrand').populate('_idbrand', '_id name').populate('_idtypeproduct', '_id name')
            .then(res => {
                if (!res) {
                    var err = {
                        message: "product not found"
                    }
                    reject(err)
                }
                var data = {
                    _id: res._id,
                    name: res.name,
                    img: res.img,
                    price: res.price,
                    _idtypeproduct: res._idtypeproduct,
                    discount: res.discount,
                    _idbrand: res._idbrand
                }
                resolve(data)

            }).catch(err => reject(err + ""))
    });
}
function layChiTietHoaDon(request) {
    return new Promise((resolve, reject) => {
            chitiethoadon.find({ _idhoadon: request.id }).select('_id _idhoadon _idmonan _idthucdon soluongmonan soluongthucdon soluonghoadon').populate('_idmonan').populate('_idthucdon').exec(
                function (err, response) {
                    if (err) {
                        var err = {
                            err: err
                        }
                        reject(err)
                    } else {
                       
                        resolve(response);
                    }
                })
       
    });
}
function layThucDonMonAn() {
    return new Promise((resolve, reject) => {
        thucdonmonan.find({}).select('_id _idthucdon _idmonan').populate('_idthucdon', '_id ten').populate('_idmonan', '_id ten').exec(
            function (err, response) {
                if (err) {
                    var err = {
                        err: err + ""
                    }
                    reject(err)
                } else {
                    var data = {
                        count: response.length,
                        values: response.map(res => {
                            return {
                                _id: res._id,
                                // tenthucdon: res._idthucdon.ten,
                                // tenmonan: res._idmonan.ten

                            }
                        })
                    }
                    resolve(data);
                }
            })
    });
}
function login(user) {
    return new Promise((resolve, reject) => {
        User.findOne({
            email: user.email
        }).exec(function (err, userModel) {
            if (err) {
                reject({
                    message: err.message
                })
            } else {
                if (userModel) {
                    var salt = userModel.salt;
                    var pass = crypto.hashWithSalt(user.password, salt)
                    if (userModel.password === pass) {
                        resolve(userModel._id)
                    } else {
                        reject({
                            statusCode: message.STATUS_CODE.NOT_FOUND,
                            message: message.ERROR_MESSAGE.USER.NOT_FOUND
                        });
                    }
                } else {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.USER.NOT_FOUND
                    })

                }
            }
        });
    });
}
function taoChiTietHoaDon(request) {
    return new Promise((resolve, reject) => {
        var chitiethoadonmoi = new chitiethoadon({
            _idhoadon: request._idhoadon,
            _idmonan: request._idmonan,
            _idthucdon: request._idthucdon,
            soluongmonan:request.soluongmonan,
            soluongthucdon:request.soluongthucdon
        });
           
            chitiethoadonmoi.save().then(result => {
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