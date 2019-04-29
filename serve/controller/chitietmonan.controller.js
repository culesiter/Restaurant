var service=require("./../service/chitietmonan.service");
module.exports={
    taoChiTietMonAn:taoChiTietMonAn1,
    layChiTietMonAn:layChiTietMonAn1,
    getProductById1:getProductById,
    xoaChiTietMonAn:xoaChiTietMonAn1,
    updateProduct2:updateProduct1
}
function taoChiTietMonAn1(req,res){
    service.taoChiTietMonAn(req.body).then((result) => {
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
function layChiTietMonAn1(req,res){
    service.layChiTietMonAn(req.query).then((result) => {
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
function xoaChiTietMonAn1(req,res){
    service.xoaChiTietMonAn(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}