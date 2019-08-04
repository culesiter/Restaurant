
const typeproduct = require("./../model/producttype.model")
const phong = require("./../model/phong.model");


const khachhang = require("./../model/khachhang.model");
const loainguoidung = require("./../model/loainguoidung.model");
const hoadon = require("./../model/hoadon.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    taoNguoiDung: taoNguoiDung,
    taoNguoiDungk: taoNguoiDungk,
    layNguoiDung: layNguoiDung,
    xoaNguoiDung: xoaNguoiDung,
    capNhatKhachHang: capNhatKhachHang,
    dangNhap: dangNhap,
    capNhatHinh: capNhatHinh,
    layNguoiDungtheoid:layNguoiDungtheoid
}
function capNhatHinh(pramas, file) {

    return new Promise((resolve, reject) => {

        khachhang.findById({ _id: pramas.id }).then(res => {

            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                res.hinhanh = file.path
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
    return new Promise((resolve, reject) => {
        khachhang.findOne({ email: request.body.email })
            .then(user => {
                if (!user) {
                    var err = { message: "that bai" }
                    return reject(err)
                }
                if(user.matkhau)
                {
                    bcrypt.compare(request.body.matkhau, user.matkhau, (err, result) => {
                        if (err) {
                            var err = { message: err + "" }
                            return reject(err)
                        }
                        if (result) {
                            const token = jwt.sign({
                                id: user._id,
                                name: user.name,
                                img: user.img
                            },
                                'secret',
                                {
                                    expiresIn: "1h"
                                })
                            var data = {
                                message: "dang nhap thanh cong",
                                _id: user._id,
                                ten: user.ten,
                                email: user.email,
                                sdt: user.sdt,
                                token: token
                            }
                            console.log(123, data);
    
                            return resolve(data)
                        }
                        err = { message: "that bai" }
                        return reject(err)
                    })
                }else{
                    var err = { message: "that bai" }
                    return reject(err)
                }
            })
            .catch(err => {
                var err = { message: err + "" }
                reject(err)
            })

    })
}
function xoaNguoiDung(request) {
    return new Promise((resolve, reject) => {
        hoadon.findOne({ _idkhachhang: request.id }).exec().then(
            response => {
                if (response) {
                    var mes = {
                        message: "rang buoc"
                    }
                    reject(mes)
                }
                else if (!response) {
                    return khachhang.remove({ _id: request.id })
                }
            }
        ).then(result => {
            const data = {
                message: "xoa thanh cong"
            }
            resolve(data)

        }).catch(err => reject(err + ""))
    });
}

function capNhatKhachHang(pramas, request) {

    return new Promise((resolve, reject) => {

        khachhang.findById({ _id: pramas.id }).then(res => {
            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                bcrypt.hash(request.matkhau, 10, (err, hash) => {
                    if (hash) {
                        res.ten = request.ten || res.ten,
                            res.matkhau = hash || res.matkhau,
                            res.email = request.email || res.email,
                            res.sdt = request.sdt || res.sdt,
                            res.diachi = request.diachi || res.diachi
                        return res.save((err, response) => {
                            if (response) {
                                const data = {
                                    message: "thanh cong",
                                    values: {
                                        _id: response._id

                                    }
                                }
                                resolve(data);
                            }

                        });
                    } else if (hash == undefined) {
                        res.ten = request.ten || res.ten,
                            res.matkhau = res.matkhau,
                            res.email = request.email || res.email,
                            res.sdt = request.sdt || res.sdt,
                            res.diachi = request.diachi || res.diachi
                        return res.save((err, response) => {
                            if (response) {
                                const data = {
                                    message: "thanh cong",
                                    values: {
                                        _id: response._id

                                    }
                                }
                                resolve(data);
                            }

                        });
                    }
                })
            }
        }).catch(err => {
            reject(err + "");
        })
    });
}

function layNguoiDungtheoid(req) {
    return new Promise((resolve, reject) => {
        khachhang.find({_id:req.id}).select('_id ten email sdt matkhau hinhanh thanhvien diem diachi').populate('_idkhachhang', 'ten').exec(
            function (err, response) {
                if (err) {
                    var err = {
                        err: err
                    }
                    reject(err)
                } else {
                    console.log(response)
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
                            diachi: res.diachi
                        }
                    }
                    )
                    resolve(data);
                }
            })
    });
}


function layNguoiDung(req) {
    return new Promise((resolve, reject) => {
        khachhang.find({}).sort( { _id: -1 } ).select('_id ten email sdt matkhau hinhanh thanhvien diem diachi').populate('_idkhachhang', 'ten').exec(
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
                            diachi: res.diachi
                        }
                    }
                    )
                    resolve(data);
                }
            })
    });
}
function taoNguoiDung(request) {
    return new Promise((resolve, reject) => {
        var email = {
            email: new RegExp('^' + request.email.trim() + '$', "i")
        }
        bcrypt.hash(request.matkhau, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                var nguoidungmoi = new khachhang({
                    ten: request.ten,
                    email: request.email,
                    sdt: request.sdt,
                    matkhau: hash,
                    hinhanh: request.hinhanh,
                    thanhvien: request.thanhvien,
                    diachi: request.diachi,
                    diem: request.diem
                });
                khachhang.find(email).then(items => {
                    if (items.length > 0) {

                        var err = {
                            message: "email da co"
                        }
                        reject(err)

                    }
                    else {
                        return nguoidungmoi.save()
                    }

                }).then(result => {
                    const data = {
                        message: "tao thanh cong",
                        values: {
                            _id: result._id

                        }
                    }
                    resolve(data);
                    console.log(data);

                }).catch(err => {
                    var err = { err: err + "" }
                    reject(err);
                })

            }
        })


    })

}  
function taoNguoiDungk(request){
    return new Promise((resolve, reject) => {
        var nguoidungmoi = new khachhang({
            ten: request.ten,
            email: request.email,
            sdt: request.sdt,
            hinhanh: request.hinhanh,
            thanhvien: request.thanhvien,
            diachi: request.diachi,
            diem: request.diem
        });
       nguoidungmoi.save().then(result => {
            const data = {
                message: "tao thanh cong",
                values: {
                    _id: result._id

                }
            }
            resolve(data);
            console.log(data);

        }).catch(err => {
            var err = { err: err + "" }
            reject(err);
        })
    })
}   