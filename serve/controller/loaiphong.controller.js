var service=require("../service/loaiphong.service");
module.exports={
    taoLoaiPhong:taoLoaiPhong1,
    layLoaiPhong:layLoaiPhong1,
    getProductById1:getProductById,
    xoaLoaiPhong:xoaLoaiPhong1,
    capNhatLoaiPhong:capNhatLoaiPhong1,
    capNhatHinh:capNhatHinh1
}
function capNhatHinh1(req,res){
    console.log(req.file);
    
    service.capNhatHinh(req.params,req.file).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function taoLoaiPhong1(req,res){
    service.taoLoaiPhong(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function capNhatLoaiPhong1(req,res){
   
   
    service.capNhatLoaiPhong(req.params,req.body).then((result) => {
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
function xoaLoaiPhong1(req,res){
    service.xoaLoaiPhong(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}