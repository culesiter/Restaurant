var router=require("express").Router();
var controller=require("../controller/loaiphong.controller");
var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/loaiphong/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const fileFiter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === ('image/png')) {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

const upload = multer({ storage: storage, fileFiter: fileFiter })
module.exports=function(){
  router.post('/',controller.taoLoaiPhong);
  router.get('/',controller.layLoaiPhong);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaLoaiPhong);
  router.put('/:id',controller.capNhatLoaiPhong);
  router.put('/img/:id',upload.single('loaiphongimg'),controller.capNhatHinh);
    return router;
}