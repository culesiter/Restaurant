
const nhanvien = require("./../model/nhanvien.model");
const bangluong = require("./../model/bangluong.model");
const lichlam = require("./../model/lichlam.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    taoNhanVien: taoNhanVien,
    xoaNhanVien: xoaNhanVien,
    layNhanVien: layNhanVien,
    updateProduct: updateProduct,
    dangNhap: dangNhap,
    capNhatHinh: capNhatHinh,
    layNhanVientheoid: layNhanVientheoid,
    capnhatnv: capnhatnv
}

function capnhatnv(pramas, request) {

    return new Promise((resolve, reject) => {

        console.log(request);
        nhanvien.findById({ _id: pramas.id }).then(res => {

            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                res.ten = request.ten || res.ten
                res.sdt = request.sdt || res.sdt
                res._idcapnhanvien = request._idcapnhanvien || res._idcapnhanvien
                res.save((err, response) => {
                    if (response) {
                        const data = {
                            message: "thanh cong",
                        }
                        resolve(data);
                    }
                    console.log(response);
                })

            }
        }).catch(err => {
            reject(err + "");
        })
    });
}
function layNhanVientheoid(req) {
    return new Promise((resolve, reject) => {
        nhanvien.find({ _id: req.id }).select('_id ten email sdt matkhau hinhanh _idcapnhanvien').populate('_idcapnhanvien').exec(
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
                            ten: res.ten,
                            email: res.email,
                            sdt: res.sdt,
                            matkhau: res.matkhau,
                            hinhanh: res.hinhanh,
                            thanhvien: res.thanhvien,
                            diem: res.diem,
                            _idcapnhanvien: res._idcapnhanvien
                        }
                    }
                    )
                    resolve(data);
                }
            })
    });
}
function capNhatHinh(pramas, file) {
    console.log(file.path)

    return new Promise((resolve, reject) => {


        nhanvien.findById({ _id: pramas.id }).then(res => {

            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                res.hinhanh = file.path || res.hinhanh
                res.save((err, response) => {
                    if (response) {
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
function dangNhap(request) {
    console.log(request);

    console.log(request.body.email);

    return new Promise((resolve, reject) => {
        nhanvien.find({ email: request.body.ten }).exec()
            .then(user => {
                console.log(user[0]);
                if (user.length < 1) {
                    var err = { message: "that bai 1" }
                    return reject(err)
                }
                bcrypt.compare(request.body.matkhau, user[0].matkhau, (err, result) => {
                    if (err) {
                        var err = { message: err + "" }
                        return reject(err)
                    }
                    if (result) {
                        const token = jwt.sign({
                            id: user[0]._id,
                            name: user[0].name,
                            img: user[0].img
                        },
                            'secret',
                            {
                                expiresIn: "1h"
                            })
                        var data = {
                            message: "dang nhap thanh cong",
                            _id: user[0]._id,
                            ten: user[0].ten,
                            email: user[0].email,
                            sdt: user[0].sdt,
                            token: token
                        }
                        return resolve(data)
                    }
                    err = { message: "that bai 2" }
                    return reject(err)
                })
            })
            .catch(err => {
                var err = { message: err + "" }
                reject(err)
            })

    })
}

function xoaNhanVien(request) {
    return new Promise((resolve, reject) => {
        bangluong.find({ _idnhavien: request.id }).then(res => {
            console.log(res);
            if (res.length != 0) {
                var err = {
                    message: "bangluong"
                }
                reject(err)
            } else if (res.length == 0) {
                return lichlam.find({ _idnhavien: request.id })
            }
        }).then(resp => {
            console.log(resp);
            if (resp.length != 0) {
                var err = {
                    message: "lichlam"
                }
                reject(err)
            } else if (resp.length == 0) {
                console.log('vào',request.id);
                
                return nhanvien.deleteOne({ _id: request.id })
            }
        }).then(result => {
            console.log(result)
            if (result) {
                const data = {
                    message: "xoa thanh cong"
                }
                resolve(data)
            }

        }).catch(err => reject(err + ""))
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
                res.name = request.name || res.name
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
function layNhanVien(req) {
    return new Promise((resolve, reject) => {
        nhanvien.find({}).sort({ _id: -1 }).select('_id ten email sdt matkhau hinhanh _idcapnhanvien').populate('_idcapnhanvien').exec(
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
                            ten: res.ten,
                            email: res.email,
                            sdt: res.sdt,
                            matkhau: res.matkhau,
                            hinhanh: res.hinhanh,
                            thanhvien: res.thanhvien,
                            diem: res.diem,
                            _idcapnhanvien: res._idcapnhanvien
                        }
                    }
                    )
                    resolve(data);
                }
            })
    });
}
function taoNhanVien(request) {
    return new Promise((resolve, reject) => {
        var email = {
            email: new RegExp('^' + request.email.trim() + '$', "i")
        }
        bcrypt.hash(request.matkhau, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                var nhanVienMoi = new nhanvien({
                    ten: request.ten,
                    email: request.email,
                    sdt: request.sdt,
                    matkhau: hash,
                    hinhanh: request.hinhanh,
                    _idcapnhanvien: request._idcapnhanvien
                });
                nhanvien.find(email).then(items => {
                    console.log(items)
                    if (items.length > 0) {

                        var err = {
                            message: "email da co"
                        }
                        reject(err)

                    }
                    else {
                        return nhanVienMoi.save()
                    }

                }).then(result => {
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
        })


    })

}     