const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'no title']
    },
    desc: {
        type: String,
        required: [true, 'no desc']
    }
});

module.exports = mongoose.model('Posts', PostSchema);