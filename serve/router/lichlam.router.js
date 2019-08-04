var router=require("express").Router();
var controller=require("../controller/lichlam.controller");
module.exports=function(){
  router.post('/',controller.taolichlam);
  router.get('/',controller.laylichlam);
  router.get('/id/',controller.laylichlamtheoid);
  router.delete('/:id',controller.xoalichlam);
    return router;
}