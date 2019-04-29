var service=require("./../service/dichvu.service");
module.exports={
    taoDichVu:taoDichVu1,
    layDichVu:layDichVu1,
    getProductById1:getProductById,
    xoaDichVu:xoaDichVu1,
    capNhatDichVu:capNhatDichVu1,
    capNhatHinh:capNhatHinh1
}
function capNhatHinh1(req,res){
    console.log(req.file);
    
    service.capNhatHinh(req.params,req.file).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err)
    });
}
function taoDichVu1(req,res){
    service.taoDichVu(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function capNhatDichVu1(req,res){
   
   
    service.capNhatDichVu(req.params,req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function layDichVu1(req,res){
   console.log(2);
   
    
    service.layDichVu().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function getProductById(req,res){
  
   
    service.getProductById(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}
function xoaDichVu1(req,res){
    service.xoaDichVu(req.params).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}