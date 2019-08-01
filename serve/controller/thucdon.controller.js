var service=require("../service/thucdon.service");
module.exports={
    taoThucDon:taoThucDon1,
    layThucDon:layThucDon1,
    monAnTheothucDon:monAnTheothucDon1,
    xoaThucDon:xoaThucDon1,
    suathucdon:suathucdon1
}
function taoThucDon1(req,res){
    service.taoThucDon(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function suathucdon1(req,res){
    service.suathucdon(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layThucDon1(req,res){
    service.layThucDon().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function monAnTheothucDon1(req,res){
  
   
    service.monAnTheothucDon(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function xoaThucDon1(req,res){
    service.xoaThucDon(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}