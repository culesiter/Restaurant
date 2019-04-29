var service=require("../service/khachhang.service");
module.exports={
    taoNguoiDung:taoNguoiDung1,
    layNguoiDung:layNguoiDung1,
    getProductById1:getProductById,
    xoaNguoiDung:xoaNguoiDung1,
    capNhatKhachHang:capNhatKhachHang1,
    dangNhap:dangNhap,
    capNhatHinh:capNhatHinh1
}
function capNhatHinh1(req,res){
    service.capNhatHinh(req.params,req.file).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function dangNhap(req,res){
    service.dangNhap(req).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function taoNguoiDung1(req,res){
    service.taoNguoiDung(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function capNhatKhachHang1(req,res){
    service.capNhatKhachHang(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layNguoiDung1(req,res){
    service.layNguoiDung().then((result) => {
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
function xoaNguoiDung1(req,res){
    service.xoaNguoiDung(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}