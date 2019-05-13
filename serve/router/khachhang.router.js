var router=require("express").Router();
var controller=require("../controller/khachhang.controller");
var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/khachhang/');
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
  router.post('/',controller.taoNguoiDung);
  router.post('/noaccount/',controller.taoNguoiDungK);
  router.get('/',controller.layNguoiDung);
  router.post('/login/',controller.dangNhap)
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaNguoiDung);
  router.put('/:id',controller.capNhatKhachHang);
  router.put('/img/:id',upload.single('khachhangimg'),controller.capNhatHinh);
    return router;
}