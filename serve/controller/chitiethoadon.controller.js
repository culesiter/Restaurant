var service=require("./../service/chitiethoadon.service");
module.exports={
    taoChiTietHoaDon:taoChiTietHoaDon1,
    layChiTietHoaDon:layChiTietHoaDon1,
    getProductById1:getProductById,
    xoaChiTietHoaDon:xoaChiTietHoaDon1,
    updateProduct2:updateProduct1
}
function taoChiTietHoaDon1(req,res){
    service.taoChiTietHoaDon(req.body).then((result) => {
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
function layChiTietHoaDon1(req,res){
    service.layChiTietHoaDon(req.params).then((result) => {
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
function xoaChiTietHoaDon1(req,res){
    service.xoaChiTietHoaDon(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}