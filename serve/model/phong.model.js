var mongoose=require("mongoose");
var phongSchema=mongoose.Schema(
    {    
        _idloai:{
            type: mongoose.Schema.Types.ObjectId, ref: 'loaiphong',
            require:true
        },
        ten:{
            type:String,
            require:true
        },
        hinhanh:{
            type:String
        }
        ,
        tinhtrang:{
           type:Number,
           default:0
       }
    }
);
var phong=mongoose.model('phong',phongSchema);
module.exports=phong;