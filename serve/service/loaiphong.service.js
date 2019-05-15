var loaimonan = require("./../model/loaimonan.model");

const loaiphong = require("./../model/loaiphong.model");
const phong = require("./../model/phong.model");
module.exports = {
    taoLoaiPhong: taoLoaiPhong,
    layLoaiPhong: layLoaiPhong,
    getProductById: getProductById,
    xoaLoaiPhong: xoaLoaiPhong,
    capNhatLoaiPhong: capNhatLoaiPhong,
    capNhatHinh:capNhatHinh
}
function capNhatHinh(pramas, file) {

    return new Promise((resolve, reject) => {

        loaiphong.findById({ _id: pramas.id }).then(res => {
            
            if (!res) {
                var err = {
                    message: "khong ton tai"
                }
                reject(err)
            }
            else if (res) {
                res.hinhanh = file.path
                res.save((err,response)=>{
                    console.log(response);
                    
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
function xoaLoaiPhong(request) {
    return new Promise((resolve, reject) => {
        phong.findOne({ _idloai: request.id }).exec().then(
            response => {
                if (response) {
                    var mes = {
                        message: "phong dang ton tai loai phong nay"
                    }
                    reject(mes)
                }
                else if (!response) {
                    return loaiphong.remove({ _id: request.id })
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
function capNhatLoaiPhong(pramas, request) {

    return new Promise((resolve, reject) => {

    
                 loaiphong.findById({ _id: pramas.id }).then(res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai"
                    }
                    reject(err)
                }
                else if (res) {
                    res.ten = request.ten||res.ten
                    res.gia=request.gia||res.gia
                    res.succhua=request.succhua||res.succhua
                    res.mota=request.mota||res.mota
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
function layLoaiPhong(request) {
    return new Promise((resolve, reject) => {
        loaiphong.find({}).select('_id ten gia succhua mota hinhanh').exec(
            function (err, response) {
                if (err) {
                    reject(err)
                } else {

                    var data = response.map(res => {
                        return {
                            id: res._id,
                            ten: res.ten,
                            gia: res.gia,
                            succhua: res.succhua,
                            mota:res.mota,
                            hinhanh:res.hinhanh
                        }
                    }
                    )

                    resolve(data);
                }
            })
    });
}
function taoLoaiPhong(request) {
    var loaiphongmoi = new loaiphong({
        ten: request.ten,
        gia: request.gia,
        succhua: request.succhua,
        mota:request.mota
    });
    return new Promise((resolve, reject) => {
        var ten = {
            ten: new RegExp('^' + request.ten.trim() + '$', "i")
        }
        loaiphong.find(ten).then(items => {
            if (items.length > 0) {

                var err = {
                    message: "loai phong da co"
                }
                reject(err)

            }
            else {

                return loaiphongmoi.save()
            }

        }).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,
                    ten: result.ten,
                    gia: result.gia,
                    succhua: request.succhua
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