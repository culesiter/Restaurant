var service=require("./../service/chitietdichvu.service");
module.exports={
    taoChiTietDichVu:taoChiTietDichVu1,
    layChiTietDichVu:layChiTietDichVu1,
    getProductById1:getProductById,
    xoaChiTietDichVu:xoaChiTietDichVu1,
    updateProduct2:updateProduct1
}
function taoChiTietDichVu1(req,res){
    service.taoChiTietDichVu(req.body).then((result) => {
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
function layChiTietDichVu1(req,res){
    service.layChiTietDichVu(req.query).then((result) => {
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
function xoaChiTietDichVu1(req,res){
    service.xoaChiTietDichVu(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
