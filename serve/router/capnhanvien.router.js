var router=require("express").Router();
var controller=require("../controller/capnhanvien.controller");
module.exports=function(){
  router.post('/',controller.taocapnhanvien);
  router.get('/',controller.laycapnhanvien);
  router.delete('/:id',controller.xoacapnhanvien);
    return router;
}