var router=require("express").Router();
var controller=require("./../controller/monan.controller");
var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/monan/');
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
  router.post('/',controller.taoMonAn);
  router.get('/',controller.layMonAN);
  // router.get('/:id',controller.getProductById1);
  router.delete('/:id',controller.xoaMonAn);
  router.put('/:id',controller.capNhatMonAn);
  router.put('/img/:id',upload.single('monanimg'),controller.capNhatHinh);
    return router;
}