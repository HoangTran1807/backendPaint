const {createCell} = require('../controllers/cell')
const {closeCanvas} = require('../controllers/canvas');




module.exports = function (io, _arrCell, canvasId) {
    let arrCell = _arrCell // Define arrCell here

    io.on('connection', (socket) => {
        console.log('A client connected');
        // Send 'initialData' to the new client
        socket.emit('initialData', arrCell);

        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });

        socket.on('Client_SendCell', (x, y, color) => {
            createCell(x, y, color, canvasId);
            let cell = arrCell.find(cell => cell.x === x && cell.y === y);
            if (cell) {
                // If the cell already exists, update its color
                cell.color = color;
            } else {
                // If the cell does not exist, add a new cell to the array
                arrCell.push({ x, y, color });
            }
            socket.broadcast.emit('Server_SendCell', x, y, color);
        });


        socket.on('Client_Send_ClearBoard', () => {
            arrCell = [];
            io.emit('Server_Send_ClearBoard');
            console.log('Clear board');
            closeCanvas(canvasId);
        });
    });
}