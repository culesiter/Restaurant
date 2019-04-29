var router=require("express").Router();
var controller=require("../controller/loaimonan.controller");
module.exports=function(){
  router.post('/',controller.taoLoaiMon);
  router.get('/',controller.layLoaiMon);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaLoaiMon);
  router.put('/:id',controller.capNhatLoaiMon)
    return router;
}