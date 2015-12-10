var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    roles: [String]
});

var userModel = mongoose.model('userModel', userSchema);

userModel.find({}).exec(function(err, collection){
    if (collection.length === 0) {
        userModel.create({ email: 'naked@1234.dk', password: '1234', roles: [ 'admin' ] });
    }
});

module.exports = userModel;