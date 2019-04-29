const monan = require("./../model/monan.model");
const loaimon = require("./../model/loaimonan.model")
const thucdonmonan = require("./../model/chitietthucdonmonan.model")
const typeproduct = require("./../model/producttype.model")
const hoadon=require('./../model/hoadon.model');
const phong=require("./../model/phong.model");
const loaiphong=require("./../model/loaiphong.model");
const mongoose = require("mongoose")
module.exports = {
    taoPhong: taoPhong,
    layPhong: layPhong,
    getProductById: getProductById,
    xoaPhong: xoaPhong,
    capNhatPhong: capNhatPhong,
    capNhatHinh:capNhatHinh
}
function capNhatHinh(pramas, file) {

    return new Promise((resolve, reject) => {

        phong.findById({ _id: pramas.id }).then(res => {
            
            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                res.hinhanh = file.path
                res.save((err,response)=>{
                    if(response)
                    {
                        const data = {
                            message: "thanh cong",
                        }
                        resolve(data);
                    }
                    
                })
            }
        }).catch(err => {
            reject(err + "");
        })
    });
}

function xoaPhong(request) {
    return new Promise((resolve, reject) => {
phong.findOne({_id:request.id}).exec().then(
    response=>{
        if(!response)
        {
            var mes={
                message:"0 co"
            }
            reject(mes)
        }
        else if(response)
        {
          return  phong.remove({ _id: request.id })
        }
    }
 )
      .then(result => {
            const data = {
                message: "xoa thanh cong"
            }
            resolve(data)

        }).catch(err => reject(err + ""))
    });
}

function capNhatPhong(pramas, request) {

    return new Promise((resolve, reject) => {
    
        loaiphong.findOne({ _id: request._idloai }).then(
            response => {
                if (!response && request._idloai) {
                    var err = {
                        message: "khong ton tai loai phong"
                    }
                    reject(err)
                    
                }
                else{
                    return phong.findById({ _id: pramas.id })
                }
            }
        ).then(res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai"
                    }
                    reject(err)
                }
                else if (res) {
                    res.ten = request.ten||res.ten
                    res.tinhtrang=request.tinhtrang||res.tinhtrang
                    res._idloai=request._idloai||res._idloai
                    return res.save()
                }
            }).then(result => {
                const data = {
                    message: "thanh cong",
                    values: {
                        ten: result.ten,
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
                    hinhanh:res.hinhanh,
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
function layPhong() {
    return new Promise((resolve, reject) => {
        phong.find({}).select('_id ten _idloai tinhtrang hinhanh').populate('_idloai', '_id ten gia succhua').exec(
            function (err, response) {
                if (err) {
                    var err={
                        err:err
                    }
                    reject(err)
                } else {
                    var data = response.map(res => {
                        return {
                            _id:res._id,
                             ten: res.ten,
                            loai: res._idloai.ten,
                            gia: res._idloai.gia,
                            succhua: res._idloai.succhua,
                            tinhtrang: res.tinhtrang
                            
                        }
                    }

                    )

                    resolve(data);
                }
            })
    });
}
function getProduct1() {
    return new Promise((resolve, reject) => {
        product.find({}).select('_id name img price discount _idtypeproduct _idbrand').populate('_idbrand', '_id name').populate('_idtypeproduct', '_id name').exec(
            function (err, response) {
                if (err) {
                    reject(err)
                } else {
                    var data = {
                        count: response.length,
                        values: response.map(res => {
                            return {
                                _id: res._id,
                                name: res.name,
                                img: res.img,
                                price: res.price,
                                _idtypeproduct: res._idtypeproduct,
                                discount: res.discount,
                                _idbrand: res._idbrand
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
function taoPhong(request) {
    var phongmoi = new phong({
        _idloai: request._idloai,
        ten:request.ten,
        tinhtrang: request.tinhtrang
    });
    return new Promise((resolve, reject) => {
        var ten = {
            ten: new RegExp('^' + request.ten.trim() + '$', "i")
        }
        phong.find(ten).then(items => {
            if (items.length > 0) {
                var err = {
                    message: "phong da co"
                }
                reject(err)
            }
            else {
                return  loaiphong.findById(request._idloai);
            }

        }).then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai loai"
                    }
                    reject(err)
                }
                else if (res) {
                    return phongmoi.save()
                }
            }
        ).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,
                    _idloai:result._idloai,

                }
            }
            resolve(data);

        }).catch(err => {
            var err={err:err+""}
            reject(err );
        })
    }
    )
}     