var loaimonan = require("./../model/loaimonan.model");
const dichvu= require("./../model/dichvu.model");
const chitietdichvu=require('./../model/chitietdichvu.model');
const hoadon=require('./../model/hoadon.model')
module.exports = {
    taoDichVu: taoDichVu,
    layDichVu: layDichVu,
    getProductById: getProductById,
    xoaDichVu: xoaDichVu,
    capNhatDichVu: capNhatDichVu,

    capNhatHinh:capNhatHinh
}
function capNhatHinh(pramas, file) {

    return new Promise((resolve, reject) => {

        dichvu.findById({ _id: pramas.id }).then(res => {
            
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
function xoaDichVu(request) {
    return new Promise((resolve, reject) => {
        hoadon.findOne({_id:request.id}).exec((err, response) => {
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
                    chitietdichvu.remove({ _idhoadon: request.id  }).exec(function (err,response) {
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
function capNhatDichVu(pramas, request) {

    return new Promise((resolve, reject) => {

           dichvu.findById({ _id: pramas.id }).then(res => {
                if (!res) {
                    var err = {
                        message: "khong ton tai"
                    }
                    reject(err)
                }
                else if (res) {
                    res.ten = request.ten||res.ten
                    res.gia =request.gia||res.gia
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
function layDichVu() {
    return new Promise((resolve, reject) => {
        dichvu.find({}).select('_id ten gia hinhanh').exec(
            function (err, response) {
                if (err) {
                    reject(err)
                } else {
                     
                    var data = response.map(res => {
                        return {
                            _id: res._id,
                            ten: res.ten,
                            gia:res.gia,
                            hinhanh:res.hinhanh
                        }
                    }

                    )

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
function taoDichVu(request) {


    var dichvumoi = new dichvu({  
        ten:request.ten,
        gia:request.gia
    });
    
    return new Promise((resolve, reject) => {
        var ten={
            ten: new RegExp('^'+request.ten.trim()+'$',"i")
        }
      dichvu.find(ten).then(items=>{
      
          
       
        
          if(items.length>0){
           
              var err={
                  message:"dich vu da co"
              }
              reject(err)

          }
          else{
           
              return dichvumoi.save()
          }
        
         }).then(result => {
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,
                    ten: result.ten
                }
            }
            resolve(data);

        }).catch(err => {
          var  err={
                err:err+""
            }
            reject(err+"");
        })
    }
    )
}