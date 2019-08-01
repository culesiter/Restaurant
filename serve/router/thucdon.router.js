var router=require("express").Router();
var controller=require("../controller/thucdon.controller");
module.exports=function(){
  router.post('/',controller.taoThucDon);
  router.get('/',controller.layThucDon);
  router.get('/monantheothucdon/:id',controller.monAnTheothucDon);
  router.delete('/:id',controller.xoaThucDon);
  router.put('/:id',controller.suathucdon);
    return router;
}