var service=require("../service/loainguoidung.service");
module.exports={
    taoLoaiNguoiDung:taoLoaiNguoiDung1,
    layLoaiNguoiDung:layLoaiNguoiDung1,
    getProductById1:getProductById,
    xoaLoaiNguoiDung:xoaLoaiNguoiDung1,
    updateProduct2:updateProduct1
}
function taoLoaiNguoiDung1(req,res){
    service.taoLoaiNguoiDung(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function updateProduct1(req,res){
   
   
    service.updateProduct(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layLoaiNguoiDung1(req,res){
    service.layLoaiNguoiDung().then((result) => {
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
function xoaLoaiNguoiDung1(req,res){
    service.xoaLoaiNguoiDung(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}