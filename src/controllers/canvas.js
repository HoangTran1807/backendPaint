const Canvas = require('../models/canvas');

const createCanvas = async (name, size) => {
    return await Canvas.create({ name, size });
}

const getCurrCanvasId = async () => {
    while (true) {
        const canvas = await Canvas.findOne({isClosed:'false'}).sort({ timestamp: -1 });
        if (canvas) {
            return canvas._id;
        }
        else{
            await createCanvas('Canvas', 200);
        
        }
    }
}

const closeCanvas = async (canvasId) => {
    return await Canvas.updateOne({ _id: canvasId }, { isClosed: true });
}

module.exports = {createCanvas, getCurrCanvasId, closeCanvas};