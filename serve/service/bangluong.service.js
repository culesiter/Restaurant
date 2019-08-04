
const thucdonmonan = require("./../model/chitietthucdonmonan.model")
const hoadon = require("./../model/hoadon.model");
const phong = require("./../model/phong.model");
const dichvu = require("./../model/dichvu.model");
const chitiethoadon = require("./../model/chitiethoadon.model");
const chitietdichvu= require("./../model/chitietdichvu.model");
const nhanvien=require("../model/nhanvien.model");
const capnhanvien=require("../model/capnhanvien.model");
const bangluong=require("../model/bangluong.model");
const mongoose = require("mongoose")
module.exports = {
    taobangluong: taobangluong,
    laybangluong: laybangluong,
    xoabangluong: xoabangluong,
    laybangluongtheoid:laybangluongtheoid
}
function xoabangluong(request) {
    return new Promise((resolve, reject) => {
        bangluong.remove({ _id: request.id }).then(res=>{
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
function laybangluong() {
    return new Promise((resolve, reject) => {
                bangluong.find({}).select('_id _idnhanvien songaylam ghichu tongluong ngaytinh thangtra namtra cap luongtheongay').populate('_idnhanvien').exec(
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
                                    _idnhanvien:res._idnhanvien,
                                    songaylam:res.songaylam,
                                    ghichu:res.ghichu,
                                    tongluong:res.tongluong,
                                    ngaytinh:res.ngaytinh,
                                    thangtra:res.thangtra,
                                    namtra:res.namtra,
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
function laybangluongtheoid(req) {
    console.log(req.id)
    return new Promise((resolve, reject) => {
                bangluong.find({_idnhanvien:req.id}).select('_id _idnhanvien songaylam ghichu tongluong ngaytinh thangtra namtra cap luongtheongay').populate('_idnhanvien').exec(
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
                                    _idnhanvien:res._idnhanvien,
                                    songaylam:res.songaylam,
                                    ghichu:res.ghichu,
                                    tongluong:res.tongluong,
                                    ngaytinh:res.ngaytinh,
                                    thangtra:res.thangtra,
                                    namtra:res.namtra,
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
function taobangluong(request) {
    return new Promise((resolve, reject) => {
        var bangluongmoi = new bangluong({
            _idnhanvien: request._idnhanvien,
            songaylam:request.songaylam,
            ghichu:request.ghichu,
            tongluong:request.tongluong,
            ngaytinh:request.ngaytinh,
            thangtra:request.thangtra,
            namtra:request.namtra,
            luongtheongay:request.luongtheongay,
            cap:request.cap
        });
         console.log(bangluongmoi);
        bangluongmoi.save().then(result => {
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