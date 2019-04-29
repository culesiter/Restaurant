var mongoose=require("mongoose");
var dichvuSchema=mongoose.Schema(
    {
        ten:{
            type: String,
            require: true
        }, 
        gia:{
            type: Number,
            require: true
        },
        hinhanh:{
            type:String
        }
      
    }
);
var dichvu=mongoose.model('dichvu',dichvuSchema);
module.exports=dichvu;