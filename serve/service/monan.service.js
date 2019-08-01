const monan = require("./../model/monan.model");
const loaimon = require("./../model/loaimonan.model")
const thucdonmonan = require("./../model/chitietthucdonmonan.model")
const chitiethoadon = require("./../model/chitiethoadon.model")
const typeproduct = require("./../model/producttype.model")
const mongoose = require("mongoose")
module.exports = {
    taoMonAn: taoMonAn1,
    layMonAN: layMonAN,
    getProductById: getProductById,
    xoaMonAn: xoaMonAn,
    capNhatMonAn: capNhatMonAn,
    capNhatHinh:capNhatHinh
}
function capNhatHinh(pramas, file) {

    return new Promise((resolve, reject) => {

        monan.findById({ _id: pramas.id }).then(res => {
            
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
function xoaMonAn(request) {
    return new Promise((resolve, reject) => {
        thucdonmonan.findOne({ _idmonan: request.id }).exec().then(
            response => {
                console.log(response);
                
                if (response) {
                    var mes = {
                        message: "rangbuoc"
                    }
                    reject(mes)
                }
                else if (!response) {
                    console.log(3);
                    
                    return chitiethoadon.findOne({ _idmonan: request.id })

                }
            }
        ).then(
            res => {
                if (res) {
                    var mes = {
                        message: "hoa don dang ton tai"
                    }
                    reject(mes)
                }
                else if (!res) {
                    console.log(2);
                    
                    return monan.remove({ _id: request.id })
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
function capNhatMonAn(pramas, request) {
    return new Promise((resolve, reject) => {
          loaimon.findOne({ _id: request._idloai }).then(
            response => {
                if (!response && request._idloai) {
                    var err = {
                        message: "khong ton tai loai mon an"
                    }
                    reject(err)
                    
                }
                else{
                    console.log(pramas.id);
                    
                    return monan.findById({ _id: pramas.id })
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
                res.gia = request.gia||res.gia
                res._idloai = request._idloai||res._idloai
                res.hinhanh = request.hinhanh||res.hinhanh
                res.khuyenmai = request.khuyenmai||res.khuyenmai
                return res.save()
            }
        }).then(result => {
            const data = {
                message: "thanh cong",
                values: {
                    _id: result._id
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
function layMonAN() {
    return new Promise((resolve, reject) => {
        monan.find({}).select('_id ten hinhanh gia khuyenmai _idloai ').populate('_idloai', '_id ten').exec(
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
                            hinhanh: res.hinhanh,
                            gia: res.gia,
                            loai: res._idloai.ten,
                            _idloai:res._idloai._id,
                            khuyenmai: res.khuyenmai
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
function taoMonAn1(request) {

    var monanmoi = new monan({
        ten: request.ten,
        hinhanh: request.hinhanh,
        gia: request.gia,
        _idloai: request._idloai,
        khuyenmai: request.khuyenmai
    });
    return new Promise((resolve, reject) => {
        var ten={
            ten: new RegExp('^'+request.ten.trim()+'$',"i")
        }
        loaimon.find(ten).then(items=>{
            if(items.length>0){
                var err={
                    message:"mon da co"
                }
                reject(err)
            }
            else{
                return loaimon.findById(request._idloai)
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
                    return monanmoi.save()
                }
            }
        ).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,
                    ten: result.ten,
                    hinhanh: result.hinhanh,
                    gia: result.gia,
                    khuyenmai: result.khuyenmai,
                    _idloai: result._idloai
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