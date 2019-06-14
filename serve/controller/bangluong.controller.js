var service=require("./../service/bangluong.service");
module.exports={
    taobangluong:taobangluong1,
    laybangluong:laybangluong1,
    xoabangluong:xoabangluong1,
    laybangluongtheoid:laybangluongtheoid1
}
function taobangluong1(req,res){
    service.taobangluong(req.body).then((result) => {
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
function xoabangluong1(req,res){
    service.xoabangluong(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function laybangluong1(req,res){
    service.laybangluong().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function laybangluongtheoid1(req,res){
    service.laybangluongtheoid(req.query).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}