var router=require("express").Router();
var controller=require("../controller/bangluong.controller");
module.exports=function(){
  router.post('/',controller.taobangluong);
  router.get('/',controller.laybangluong);
  router.get('/id/',controller.laybangluongtheoid);
  router.delete('/:id',controller.xoabangluong);
    return router;
}