const mongoose = require('mongoose');
const imageSchema =  mongoose.Schema({
    prompt: {type: String, required: true},
    imageUrl : {type : String, required: true},
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;