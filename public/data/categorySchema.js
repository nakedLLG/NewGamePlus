var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    //headBrand: String,
    brands: [String]
});

var CategoryModel = mongoose.model('CategoryModel', categorySchema);

module.exports = CategoryModel;
