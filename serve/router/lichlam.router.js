var router=require("express").Router();
var controller=require("../controller/lichlam.controller");
module.exports=function(){
  router.post('/',controller.taolichlam);
  //router.get('/',controller.laybangluong);
  //router.get('/id/',controller.laybangluongtheoid);
  //router.delete('/:id',controller.xoabangluong);
    return router;
}