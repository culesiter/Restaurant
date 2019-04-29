var router=require("express").Router();
var controller=require("../controller/thucdonmonan.controller");
module.exports=function(){
  router.post('/',controller.taoThucDonMonAn);
  router.get('/',controller.layThucDonMonAn);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaThucDonMonAn);
  // router.put('/:id',controller.updateProduct2);
    return router;
}