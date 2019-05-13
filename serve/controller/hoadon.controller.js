var service = require("./../service/hoadon.service");
module.exports = {
    taoHoaDon : taoHoaDon1 ,
    layHoaDon: layHoaDon1,
    getProductById1: getProductById,
    xoaHoaDon: xoaHoaDon1,
    updateProduct2: updateProduct1,
    layHoaDonTheoDay:layHoaDonTheoDay1,
    layHoaDonNguoiDung:layHoaDonNguoiDung1,
    layHoaDonId:layHoaDonId1
}
function layHoaDonTheoDay1(req, res) {
    service.layHoaDonTheoDay(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function taoHoaDon1(req, res) {
    service.taoHoaDon(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function updateProduct1(req, res) {


    service.updateProduct(req.params, req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layHoaDonId1(req, res) {
    service.layHoaDonId(req.query).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layHoaDon1(req, res) {



    service.layHoaDon(req.query).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layHoaDonNguoiDung1(req, res) {
    service.layHoaDonNguoiDung(req.query).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function getProductById(req, res) {


    service.getProductById(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function xoaHoaDon1(req, res) {
    service.xoaHoaDon(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}