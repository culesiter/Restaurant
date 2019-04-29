var router=require("express").Router();
var controller=require("../controller/dichvu.controller");
var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/dichvu/');
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
  router.post('/',controller.taoDichVu);
  router.get('/',controller.layDichVu);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaDichVu);
  router.put('/:id',controller.capNhatDichVu);
  router.put('/img/:id',upload.single('dichvuimg'),controller.capNhatHinh);
    return router;
}