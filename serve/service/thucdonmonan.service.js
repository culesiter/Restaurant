const thucdon = require("./../model/thucdon.model");
const monan = require("./../model/monan.model")
const thucdonmonan = require("./../model/chitietthucdonmonan.model")
const mongoose = require("mongoose")
module.exports = {
    taoThucDonMonAn: taoThucDonMonAn,
    layThucDonMonAn: layThucDonMonAn,
    getProductById: getProductById,
    xoaThucDonMonAn: xoaThucDonMonAn,
    updateProduct: updateProduct
}
function xoaThucDonMonAn(request) {
    return new Promise((resolve, reject) => {
        thucdon.findOne({_id:request.id}).exec((err, response) => {
            
            console.log(response);
            
            if (err) {
                var err = { err: err + "" }
                reject(err);
            }
            else {
                if (!response) {
                    var mes = { message: "khong ton tai" }
                    reject(mes);
                }
                else if (response) { 
                    thucdonmonan.remove({ _idthucdon: request.id  }).exec(function (err,response) {
                        if (err) {
                            reject(err+"");
                        } else {
                            var mes={
                                message:"xoa thanh cong"
                            }
                            resolve(mes);
                        }
                    });
                }
            }
        })
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
                            khuyenmai: res.khuyenmai
                        }
                    }

                    )

                    resolve(data);
                }
            })
    });
}
function layThucDonMonAn() {  
    return new Promise((resolve, reject) => {
        thucdonmonan.find({}).select('_id _idthucdon _idmonan soluong').populate('_idthucdon', '_id ten').populate('_idmonan', '_id ten gia').exec(
            function (err, response) {
                if (err) {
                    var err = {
                        err: err + ""
                    }
                    reject(err)
                } else {
                    var data = response.map(res => {
                        if(!res._idmonan)
                        {
                            return {
                        
                                _idthucdon:res._idthucdon._id,
                                tenthucdon: res._idthucdon.ten,
                    
   
                            }
                        }else{
                            return {
                                _idmonan: res._idmonan._id,
                                _idthucdon:res._idthucdon._id,
                                tenthucdon: res._idthucdon.ten,
                                tenmonan: res._idmonan.ten,
                                soluong:res.soluong,
                                gia:res._idmonan.gia
                            }
                        }
                      
                    })
                    resolve(data);
                }
            })
    });
}
function taoThucDonMonAn(request) {
    var thucdonmonanmoi = new thucdonmonan({
        _idmonan: request._idmonan,
        _idthucdon: request._idthucdon,
        soluong:request.soluong
    });
    return new Promise((resolve, reject) => {
        thucdon.findById(request._idthucdon).exec().then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai thuc don"
                    }
                    reject(err)
                }
                else if (res) {
                    return monan.findById(request._idmonan)
                }
            }
        ).then(
            res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai mon an"
                    }
                    reject(err)
                }
                else if (res) {
                    return thucdonmonanmoi.save()
                }
            }
        ).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,
                    _idthucdon: result._idthucdon,
                    _idmonan: result._idmonan,
                    soluong:result.soluong
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