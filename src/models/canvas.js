const mongoose = require('mongoose');

const CanvasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isClosed:{
        type: Boolean,
        default: false
    },
    size:{
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Canvas = mongoose.model('Canvas', CanvasSchema, 'canvas');

module.exports = Canvas;