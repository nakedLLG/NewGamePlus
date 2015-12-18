var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    image: String,
    description: String
});

var GameModel = mongoose.model('GameModel', gameSchema);

module.exports = GameModel;
