
var service=require("../service/thucdonmonan.service");
module.exports={
    taoThucDonMonAn:taoThucDonMonAn1,
    layThucDonMonAn:layThucDonMonAn1,
    getProductById1:getProductById,
    xoaThucDonMonAn:xoaThucDonMonAn1,
    updateProduct2:updateProduct1
}
function taoThucDonMonAn1(req,res){
    service.taoThucDonMonAn(req.body).then((result) => {
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
function layThucDonMonAn1(req,res){
    service.layThucDonMonAn().then((result) => {
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
function xoaThucDonMonAn1(req,res){
    service.xoaThucDonMonAn(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}