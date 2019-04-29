var router=require("express").Router();
var controller=require("../controller/loainguoidung.controller");
module.exports=function(){
  router.post('/',controller.taoLoaiNguoiDung);
  router.get('/',controller.layLoaiNguoiDung);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaLoaiNguoiDung);
  // router.put('/:id',controller.capNhatLoaiMon)
    return router;
}