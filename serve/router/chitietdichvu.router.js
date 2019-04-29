var router=require("express").Router();
var controller=require("../controller/chitietdichvu.controller");
module.exports=function(){
  router.post('/',controller.taoChiTietDichVu);
  router.get('/',controller.layChiTietDichVu);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaChiTietDichVu);
  // router.put('/:id',controller.capNhatLoaiMon)
    return router;
}