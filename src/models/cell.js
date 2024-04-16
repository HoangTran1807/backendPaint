const mongoose = require('mongoose');

const CellSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    canvasId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Cell = mongoose.model('Cell', CellSchema, 'cell');

module.exports = Cell;