var thucdon = require("./../model/thucdon.model");
var service = require("../service/thucdonmonan.service");
const monan = require("./../model/monan.model")
const thucdonmonan = require("./../model/chitietthucdonmonan.model")
module.exports = {
    taoThucDon: taoThucDon,
    layThucDon: layThucDon,
    monAnTheothucDon: monAnTheothucDon,
    xoaThucDon: xoaThucDon,
    suathucdon: suathucdon

}
function xoaThucDon(request) {
    return new Promise((resolve, reject) => {


        thucdon.findOne({
            _id: request.id
        }).exec().then(response => {
            if (!response) {
                reject("khong co thuc don nay!")
            } else {
                return thucdonmonan.remove({ _idthucdon: request.id })
            }
        }
        ).then(res => {
            if (res) {
                thucdon.remove({
                    _id: request.id
                }).exec(function (err, response) {
                    if (err) {
                        reject(err + "");
                    } else {
                        var mes = {
                            message: "xoa thuc don thanh cong"
                        }
                        resolve(mes);
                    }
                });
            } else if (!res) {
                reject("khong co thuc don nay!")
            }
        }).catch(err => {
            var err = {
                err: err + ""
            }
            reject(err + "");
        });
    });
}
function suathucdon(pramas, request) {
    return new Promise((resolve, reject) => {
        thucdon.findById({ _id: pramas.id }).then(res => {
            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                res.khuyenmai = request.khuyenmai || res.khuyenmai
                res.gia = request.gia || res.gia
                return res.save()
            }
        }).then(result => {
            const data = {
                message: "thanh cong",
                values: {
                    gia: result.gia,
                    khuyenmai: result.khuyenmai
                }
            }
            resolve(data);

        }).catch(err => {
            reject(err + "");
        })
    })
}
function monAnTheothucDon(req) {
    console.log(req.pramas);

    return new Promise((resolve, reject) => {
        thucdonmonan.find({ _idthucdon: req.id }).select('_id _idthucdon _idmonan soluong').populate('_idmonan', '_id ten gia hinhanh _idloai').then(response => {
            console.log(response);


            if (response.length < 0) {
                var mes = { message: "khong ton tai" }
                reject(mes);
            }
            else if (response) {
                var data = response.map(res => {
                    return {
                        _idmonan: res._idmonan._id,
                        tenmonan: res._idmonan.ten,
                        soluong: res.soluong,
                        gia: res._idmonan.gia,
                        _idloai: res._idmonan._idloai.ten
                    }
                })
                resolve(data);

            }
        }).catch(err => {
            var err = {
                err: err + ""
            }
            reject(err + "");
        })
    });
}
function layThucDon() {
    return new Promise((resolve, reject) => {
        thucdon.find({}).select('_id ten khuyenmai gia').exec(
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
                            khuyenmai: res.khuyenmai,
                            gia:res.gia
                        }
                    }

                    )

                    resolve(data);
                }
            })
    });
}

function taoThucDon(request) {

    var thucdonmoi = new thucdon({
        ten: request.ten,
        khuyenmai: request.khuyenmai
    });
    return new Promise((resolve, reject) => {


        var ten = {
            ten: new RegExp('^' + request.ten.trim() + '$', "i")
        }
        thucdon.find(ten).then(items => {

            if (items.length > 0) {

                var err = {
                    message: "thuc don mon da co"
                }
                reject(err)

            }
            else {

                return thucdonmoi.save()
            }

        }).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,
                    ten: result.ten,
                    khuyenmai: result.khuyenmai,
                    gia: result.gia,
                }
            }
            resolve(data);

        }).catch(err => {
            var err = {
                err: err + ""
            }
            reject(err + "");
        })
    }
    )


}