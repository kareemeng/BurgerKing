var mongoose=require('mongoose');
const ProductChema=mongoose.Schema({
    Productname:{
        type:String,
        required:true
    },
    Productprice:
    {
        type:String,
        required:true
    },
    Productdescription:
    {
        type:String,
        required:true
    },
    Productimge:
    {
        type:String,
        required:true
    },
    Productccategory:
    {
        type:String,
        required:true
    },
})
module.exports=mongoose.model('Product',ProductChema);