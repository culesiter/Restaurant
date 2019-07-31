var service=require("../service/khachhang.service");
module.exports={
    taoNguoiDung:taoNguoiDung1,
    layNguoiDung:layNguoiDung1,
    getProductById1:getProductById,
    xoaNguoiDung:xoaNguoiDung1,
    capNhatKhachHang:capNhatKhachHang1,
    dangNhap:dangNhap,
    capNhatHinh:capNhatHinh1,
    taoNguoiDungK:taoNguoiDungK1,
    layNguoiDungtheoid:layNguoiDungtheoid1
}
function layNguoiDungtheoid1(req,res){
    service.layNguoiDungtheoid(req.query).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
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
function taoNguoiDungK1(req,res){
    service.taoNguoiDungk(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function taoNguoiDung1(req,res){
    console.log('manh vua tao tk');
    console.log(req.body)
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