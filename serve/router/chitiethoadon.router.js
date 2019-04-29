var router=require("express").Router();
var controller=require("../controller/chitiethoadon.controller");
module.exports=function(){
  router.post('/',controller.taoChiTietHoaDon);
  router.get('/:id',controller.layChiTietHoaDon);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaChiTietHoaDon);
  // router.put('/:id',controller.capNhatLoaiMon)
    return router;
}