var mongoose=require("mongoose");
var productSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        name:{
            type:String,
            require:true
        },
        img:{
            type:String,
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        _idtypeproduct:{
            type:mongoose.Schema.Types.ObjectId,ref:'producttype',
            require:true
           
        },
        discount:{
            type:Number,
            default:0
        },
        _idbrand:{
            type:mongoose.Schema.Types.ObjectId,ref:'brand',
            require:true
        }


    }
);
var product=mongoose.model('product',productSchema);
module.exports=product;