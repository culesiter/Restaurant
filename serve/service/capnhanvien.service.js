
const thucdonmonan = require("./../model/chitietthucdonmonan.model")

const hoadon = require("./../model/hoadon.model");
const phong = require("./../model/phong.model");

const dichvu = require("./../model/dichvu.model");
const chitiethoadon = require("./../model/chitiethoadon.model");
const chitietdichvu= require("./../model/chitietdichvu.model");
const capnhanvien=require("../model/capnhanvien.model")
const mongoose = require("mongoose")
module.exports = {
    taocapnhanvien: taocapnhanvien,
    laycapnhanvien: laycapnhanvien,
    xoacapnhanvien: xoacapnhanvien,
}
function xoacapnhanvien(request) {
    return new Promise((resolve, reject) => {
        capnhanvien.remove({ _id: request.id }).then(res=>{
            var mes = {
                message: "xoa thanh cong",
                message_2:res
            }
            resolve(mes);
        }).catch(err=>{
            var err={
                err:err+""
            }
            reject(err);
        }
        )
    });
}
function laycapnhanvien() {
    return new Promise((resolve, reject) => {
                capnhanvien.find({}).select('_id cap luongtheongay ').exec(
                    function (err, response) {
                        if (err) {
                            var err = {
                                err: err
                            }
                            reject(err)
                        } else {
                            var data = response.map(res => {
                                return {
                                    _id:res._id,
                                    cap:res.cap,
                                    luongtheongay:res.luongtheongay
                                }
                            }
        
                            )
                            resolve(data);
                        }
                    })
        
   
    });
}
function taocapnhanvien(request) {
    return new Promise((resolve, reject) => {
        var capnhanvienmoi = new capnhanvien({
            cap: request.cap,
            luongtheongay: request.luongtheongay
        });
        var cap = {
            cap: new RegExp('^' + request.cap.trim() + '$', "i")
        }
        capnhanvien.find(cap).then(items => {
            if (items.length > 0) {

                var err = {
                    message: "Đã tồn tại cấp này!"
                }
                reject(err)

            }
            else {

                return capnhanvienmoi.save()
            }

        }).then(result => {
            console.log('đã tạo chi tiết dịch vụ');
            const data = {
                message: "luu thanh cong",
                values: {
                    _id: result._id,

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