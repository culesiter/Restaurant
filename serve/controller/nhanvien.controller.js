var service=require("../service/nhanvien.services");
module.exports={
    taoNhanVien:taoNhanVien1,
    layNhanVien:layNhanVien1,
    xoaNhanVien:xoaNhanVien1,
    updateProduct2:updateProduct1,
    dangNhap:dangNhap1,
    capNhatHinh:capNhatHinh1
}
function capNhatHinh1(req,res){
    service.capNhatHinh(req.params,req.file).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function dangNhap1(req,res){
    service.dangNhap(req).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function taoNhanVien1(req,res){
    service.taoNhanVien(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function updateProduct1(req,res){
   console.log(1);
   
    service.updateProduct(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layNhanVien1(req,res){
    service.layNhanVien().then((result) => {
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
function xoaNhanVien1(req,res){
    service.xoaNhanVien(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}