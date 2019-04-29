var mongoose=require("mongoose");
var detailcartschema=mongoose.Schema(
    {
        _idproduct:{
            type: mongoose.Schema.Types.ObjectId, ref: 'cart',
            require: true
        },
        _idcart:{
            type: mongoose.Schema.Types.ObjectId, ref: 'product',
            require: true
        },
        quantitys:{
            type:Number,
            require:true
        },
       count:{
           type:Number,
           require:true
       },
       price:{
        type:Number,
        require:true
       }


    }
);
var detailcart=mongoose.model('detailcart',detailcartschema);
module.exports=detailcart;