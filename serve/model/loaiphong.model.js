var mongoose=require("mongoose");
var loaiphongSchema=mongoose.Schema(
    {
        ten:{
            type:String,
            require: true
        },
        gia:{
            type:Number,
            require: true
        },
        succhua:{
            type:Number,
            require: true
        },
        hinhanh:{
            type:String
        },
        mota:{
            type:String,
            default:'Standard - phòng tiêu chuẩn trong Nhà hàngn, là loại phòng ăn đơn giản nhất với những trang bị tối thiểu, có diện tích nhỏ, ở tầng thấp, không có view hoặc view không đẹp. Đây là loại phòng có mức giá thấp nhất trong khách sạn. Một số khách sạn sẽ không có loại phòng standard vì tất cả các phòng đều có view đẹp và được trang bị những thiết bị tiện nghi nhất.'
        }
    }
);
var loaiphong=mongoose.model('loaiphong',loaiphongSchema);
module.exports=loaiphong;