var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan')


var database = require("./database/index");
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use('/upload',express.static('upload'));

app.use('/loaimon', require('./router/loaimonan.router.js')());
app.use('/monan', require('./router/monan.router.js')());
app.use('/thucdon', require('./router/thucdon.router.js')());
app.use('/thucdonmonan', require('./router/thucdonmonan.router.js')());
app.use('/loaiphong', require('./router/loaiphong.router.js')());
app.use('/phong', require('./router/phong.router.js')());
app.use('/dichvu', require('./router/dichvu.router.js')());
app.use('/loainguoidung', require('./router/loainguoidung.router')());
app.use('/khachhang', require('./router/khachhang.router.js')());
app.use('/nhanvien', require('./router/nhanvien.router')());
app.use('/hoadon', require('./router/hoadon.router')());
app.use('/chitiethoadon', require('./router/chitiethoadon.router.js')());
app.use('/chitietdichvu', require('./router/chitietdichvu.router')());
app.use('/chitietmonan', require('./router/chitietmonan.router')());
app.use('/capnhanvien', require('./router/capnhanvien.router.js')());
app.use('/bangluong', require('./router/bangluong.router.js')());

app.listen(3000, () => {
    console.log("serve's running ...");

})