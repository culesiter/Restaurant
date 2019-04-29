var service=require("../service/monan.service");
module.exports={
    taoMonAn:taoMonAn1,
    layMonAN:layMonAN1,
    getProductById1:getProductById,
    xoaMonAn:xoaMonAn1,
    capNhatMonAn:capNhatMonAn1,
    capNhatHinh:capNhatHinh1
}
function capNhatHinh1(req,res){
    service.capNhatHinh(req.params,req.file).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function taoMonAn1(req,res){
    service.taoMonAn(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function capNhatMonAn1(req,res){
    service.capNhatMonAn(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layMonAN1(req,res){
    service.layMonAN().then((result) => {
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
function xoaMonAn1(req,res){
    service.xoaMonAn(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}