var service=require("../service/lichlam.service");
module.exports={
    taolichlam:taolichlam1,
    laylichlam:laylichlam1,
    xoalichlam:xoalichlam1,
    laylichlamtheoid:laylichlamtheoid1
}
function taolichlam1(req,res){
    service.taolichlam(req.body).then((result) => {
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
function xoalichlam1(req,res){
    service.xoalichlam(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function laylichlam1(req,res){
    service.laylichlam().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function laylichlamtheoid1(req,res){
    service.laylichlamtheoid(req.query).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}