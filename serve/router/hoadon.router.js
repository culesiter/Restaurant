var router=require("express").Router();
var controller=require("../controller/hoadon.controller");
module.exports=function(){
  router.post('/',controller.taoHoaDon);
  router.get('/',controller.layHoaDon);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaHoaDon);
  router.post('/gettime/',controller.layHoaDonTheoDay);
  // router.put('/:id',controller.capNhatLoaiMon)
    return router;
}