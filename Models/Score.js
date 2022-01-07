const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
});

const score = mongoose.model('Scores', scoreSchema);
module.exports = score;