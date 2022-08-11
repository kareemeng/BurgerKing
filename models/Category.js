var mongoose = require('mongoose');
const CategoryChema = mongoose.Schema({
    Categoryname: {
        type: String,
        required: true
    },
    Categoryimge: {
        type: String,
        required: true
    }


})
module.exports = mongoose.model('Category', CategoryChema);