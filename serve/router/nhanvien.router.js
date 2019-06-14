var router=require("express").Router();
var controller=require("../controller/nhanvien.controller");
var multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/nhanvien/');
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
  router.post('/',controller.taoNhanVien);
  router.get('/',controller.layNhanVien);
  router.post('/login/',controller.dangNhap)
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaNhanVien);
  router.put('/img/:id',upload.single('nhanvienimg'),controller.capNhatHinh);
  // router.put('/:id',controller.updateProduct2)
    return router;
}