var loaimonan = require("./../model/loaimonan.model");
var loainguoidung = require("./../model/loainguoidung.model");
// var nguoidung=require("./../model/nguoidung.model");
module.exports = {
    taoLoaiNguoiDung: taoLoaiNguoiDung,
    layLoaiNguoiDung: layLoaiNguoiDung,
    getProductById: getProductById,
    xoaLoaiNguoiDung: xoaLoaiNguoiDung,
    updateProduct: updateProduct

}
function xoaLoaiNguoiDung(request) {
    return new Promise((resolve, reject) => {
        loainguoidung.findOne({_idloai:request.id}).exec().then(
            response=>{
                if(response)
                {
                    var mes={
                        message:"nguoi dung dang ton tai "
                    }
                    reject(mes)
                }
                else if(!response)
                {
                  return  loainguoidung.remove({ _id: request.id })
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
function updateProduct(pramas, request) {

    return new Promise((resolve, reject) => {

        producttype.findById({ _id: pramas.id })
            .then(res => {
                if (!res) {
                    var err = {
                        message: "catalogue not found"
                    }
                    reject(err)
                }
                else if (res) {
                    res.name = request.name
                    res.count = request.count



                    return res.save()
                }
            }).then(result => {
                const data = {
                    message: "catalogue updated",
                    values: {
                        _id: result._id,
                        name: result.name,
                        count: result.count

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
function layLoaiNguoiDung() {
    return new Promise((resolve, reject) => {
        loainguoidung.find({}).select('_id chucvu').exec(
            function (err, response) {
                if (err) {
                    reject(err)
                } else {

                    var data = response.map(res => {
                        return {
                            _id: res._id,
                            chucvu: res.chucvu
                            
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
function taoLoaiNguoiDung(request) {


    var loainguoidungmoi = new loainguoidung({  
        chucvu: request.chucvu ,
        mota:request.mota
    });
    
    return new Promise((resolve, reject) => {
        var chucvu={
            chucvu: new RegExp('^'+request.chucvu.trim()+'$',"i")
        }
      loainguoidung.find(chucvu).then(items=>{
      
          
       
        
          if(items.length>0){
           
              var err={
                  message:"trung chuc vu"
              }
              reject(err)

          }
          else{
           
              return loainguoidungmoi.save()
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