var loaimonan = require("./../model/loaimonan.model");
var monan = require("./../model/monan.model");
var mongoose = require('mongoose');
module.exports = {
    taoLoaiMon: taoLoaiMon1,
    layLoaiMon: layLoaiMon,
    getProductById: getProductById,
    xoaLoaiMon: xoaLoaiMon,
    capNhatLoaiMon: capNhatLoaiMon

}
function xoaLoaiMon(request) {
    return new Promise((resolve, reject) => {
        monan.find({ _idloai: request.id }).then(
            response => {
                if (response.length!=0) {
                    var mes = {
                        message: "rang buoc"
                    }
                   return reject(mes)
                }
                else if (response.length==0) {
                    return loaimonan.remove({ _id: request.id })
                }
            }
        ).then(res=>{
            if(res){
                const data = {
                    message: "xoa thanh cong"
                }
                resolve(data)
            }
        }).catch(err => reject(err + ""))

    });
}
function capNhatLoaiMon(pramas, request) {

    return new Promise((resolve, reject) => {

        loaimonan.findById({ _id: pramas.id }).then(res => {
            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                res.ten = request.ten || res.ten
                res.mota = request.mota || res.mota
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
        producttype.findOne({ _id: req.id }).select('_id name')
            .then(res => {
                if (!res) {
                    var err = {
                        message: "catalogue not found"
                    }
                    reject(err)
                }
                var data = {
                    name: res.name,
                    count: res.count
                }
                resolve(data)

            }).catch(err => reject(err + ""))
    });
}
function layLoaiMon() {
    return new Promise((resolve, reject) => {
        loaimonan.find({}).sort({ _id: -1 }).select('_id ten mota').exec(
            function (err, response) {
                if (err) {
                    reject(err)
                } else {

                    var data = response.map(res => {
                        return {
                            _id: res._id,
                            ten: res.ten,
                            mota:res.mota
                        }
                    }

                    )

                    resolve(data);
                }
            })
    });
}
function taoLoaiMon1(request) {
    var loaimonanmoi = new loaimonan({
        _id: new mongoose.Types.ObjectId(),
        ten: request.ten,
        mota:request.mota
    });
    console.log(loaimonanmoi);

    return new Promise((resolve, reject) => {
        var ten = {
            ten: new RegExp('^' + request.ten.trim() + '$', "i")
        }
        loaimonan.find(ten).then(items => {
            if (items.length > 0) {
                var err = {
                    message: "loai mon da co"
                }
                reject(err);

                return false;
            } else {
                console.log(err)
                return loaimonanmoi.save()
            }
        }).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,
                    ten: result.ten,
                    mota:result.mota
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