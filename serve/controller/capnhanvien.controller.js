var service=require("./../service/capnhanvien.service");
module.exports={
    taocapnhanvien:taocapnhanvien1,
    laycapnhanvien:laycapnhanvien1,
    xoacapnhanvien:xoacapnhanvien1
}
function taocapnhanvien1(req,res){
    service.taocapnhanvien(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function updateProduct1(req,res){
    service.updateProduct(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function xoacapnhanvien1(req,res){
    service.xoacapnhanvien(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function laycapnhanvien1(req,res){
    service.laycapnhanvien().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}