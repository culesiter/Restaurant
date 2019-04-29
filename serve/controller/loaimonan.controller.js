var service=require("../service/loaimonan.service");
module.exports={
    taoLoaiMon:taoLoaiMon1,
    layLoaiMon:layLoaiMon1,
    getProductById1:getProductById,
    xoaLoaiMon:xoaLoaiMon1,
    capNhatLoaiMon:capNhatLoaiMon1
}
function taoLoaiMon1(req,res){
    service.taoLoaiMon(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function capNhatLoaiMon1(req,res){
   
   
    service.capNhatLoaiMon(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layLoaiMon1(req,res){
    service.layLoaiMon().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function getProductById(req,res){
  
   
    service.getProductById(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function xoaLoaiMon1(req,res){
    service.xoaLoaiMon(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}