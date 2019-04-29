
const thucdonmonan = require("./../model/chitietthucdonmonan.model")

const hoadon = require("./../model/hoadon.model");
const phong = require("./../model/phong.model");

const dichvu = require("./../model/dichvu.model");
const chitiethoadon = require("./../model/chitiethoadon.model");
const chitietdichvu = require("./../model/chitietdichvu.model");
const monan = require("./../model/monan.model");
const thucdon = require("./../model/thucdon.model");
const chitietmonan = require("./../model/chitietmonan.model");

const mongoose = require("mongoose")
module.exports = {
    taoChiTietMonAn: taoChiTietMonAn,
    //  taoChiTietDichVu: taoChiTietDichVu,
    layChiTietMonAn: layChiTietMonAn,
    getProductById: getProductById,
    xoaChiTietMonAn: xoaChiTietMonAn,
    updateProduct: updateProduct
}
function xoaChiTietMonAn(request) {
    return new Promise((resolve, reject) => {
        chitietmonan.findById(request.id).exec().then(res=>{
            if(res)
            {
                return chitietmonan.remove({ _id: request.id })
            }
            else if(!res)
            {
                return chitietmonan.remove({_idchitiethoadon:request.id})
            }
        }).then(res=>{
            var mes = {
                message: "xoa thanh cong"
            }
            resolve(mes);
        }).catch(err=>{
            var err={
                err:err+""
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
function layChiTietMonAn(request) {
    return new Promise((resolve, reject) => {
        console.log();

        if (!request.id) {

            chitietmonan.find({}).select('_id _idchitiethoadon _idmonan _idthucdon').populate('_idmonan').populate('_idthucdon').exec(
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
                                _idchitiethoadon: res._idchitiethoadon,
                                _idmonan: res._idmonan,
                                _idthucdon: res._idthucdon
                            }
                        }

                        )

                        resolve(data);
                    }
                })
        } else {
            chitietmonan.find({ _idchitiethoadon: request.id }).select('_id _idchitiethoadon _idmonan _idthucdon').populate('_idmonan').populate('_idthucdon').exec(
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
                                _idchitiethoadon: res._idchitiethoadon,
                                _idmonan: res._idmonan,
                                _idthucdon: res._idthucdon
                            }
                        }

                        )

                        resolve(data);
                    }
                })
        }

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
function taoChiTietMonAn(request) {


    return new Promise((resolve, reject) => {
        var chitietmonanmoi = new chitietmonan({
            _idmonan: request._idmonan,
            _idthucdon: request._idthucdon,
            _idchitiethoadon: request._idchitiethoadon
        });
        monan.findById(request._idmonan).exec().then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai mon an trên"
                    }
                    reject(err)
                }
                else if (res) {
                    return thucdon.findById(request._idthucdon)
                }
            }
        ).then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton thuc don trên"
                    }
                    reject(err)
                }
                else if (res) {
                    return chitiethoadon.findById(request._idchitiethoadon)
                }
            }
        ).then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton hoa don trên"
                    }
                    reject(err)
                }
                else if (res) {
                    return chitietmonanmoi.save()
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