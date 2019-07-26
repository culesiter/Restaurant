var router = require("express").Router();
var controller = require("../controller/hoadon.controller");

// CommonJS
const { OnePayDomestic } = require('vn-payments');
const { OnePayInternational } = require('vn-payments');
const { VNPay } = require('vn-payments');
const { SohaPay } = require('vn-payments');
const { NganLuong } = require('vn-payments');


module.exports = function () {
  router.post('/', controller.taoHoaDon);
  router.get('/', controller.layHoaDon);
  router.get('/ng/', controller.layHoaDonNguoiDung);
  router.get('/id/', controller.layHoaDonId);
  router.get('/huy/:id', controller.huyHoaDonId);
  router.put('/:id', controller.suaHoaDon);
  router.delete('/:id', controller.xoaHoaDon);
  router.post('/gettime/', controller.layHoaDonTheoDay);
  router.post('/time/', controller.kiemTraNgay);

 
  // router.put('/:id',controller.capNhatLoaiMon)
  return router;
}