var router=require("express").Router();
var controller=require("../controller/chitietmonan.controller");
module.exports=function(){
  router.post('/',controller.taoChiTietMonAn);
  router.get('/',controller.layChiTietMonAn);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaChiTietMonAn);
  // router.put('/:id',controller.capNhatLoaiMon)
    return router;
}