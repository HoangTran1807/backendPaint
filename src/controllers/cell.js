const Cell = require("../models/cell");

const createCell = async (x, y, color, canvasId) => {
  return await Cell.create({ x, y, color, canvasId });
};

 const getCellsByCanvasId = async (canvasId) => {
  return await Cell.find({ canvasId });
};

 const getCellsByCanvasIdUNI = async (canvasId) => {
  const cells = await Cell.find({ canvasId }).sort({ timestamp: -1 });
  const uniqueCells = {};

  cells.forEach((cell) => {
    const key = `${cell.x}-${cell.y}`;
    if (!uniqueCells[key]) {
      uniqueCells[key] = {
        x: cell.x,
        y: cell.y,
        color: cell.color,
        canvasId: cell.canvasId,
        timestamp: cell.timestamp,
      };
    }
  });
  return uniqueCells;
};
module.exports = { createCell, getCellsByCanvasId, getCellsByCanvasIdUNI};