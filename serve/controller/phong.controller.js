var service=require("../service/phong.service");
module.exports={
    taoPhong:taoPhong1,
    layPhong:layPhong1,
    getProductById1:getProductById,
    xoaPhong:xoaPhong1,
    capNhatPhong:capNhatPhong1,
    capNhatHinh:capNhatHinh1,
    layLoaiPhong:layLoaiPhong1
}
function capNhatHinh1(req,res){
    console.log(req.file);
    
    service.capNhatHinh(req.params,req.file).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function taoPhong1(req,res){
    service.taoPhong(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function capNhatPhong1(req,res){
    service.capNhatPhong(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layPhong1(req,res){
    service.layPhong().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layLoaiPhong1(req,res){
    service.layLoaiPhong(req.query).then((result) => {
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
function xoaPhong1(req,res){
    service.xoaPhong(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}