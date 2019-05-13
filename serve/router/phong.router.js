var router=require("express").Router();
var controller=require("../controller/phong.controller");
var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/phong/');
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
  router.post('/',controller.taoPhong);
  router.get('/',controller.layPhong);
  router.get('/ph/',controller.layLoaiPhong);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaPhong);
  router.put('/:id',controller.capNhatPhong);
  router.put('/img/:id',upload.single('phongimg'),controller.capNhatHinh);
    return router;
}