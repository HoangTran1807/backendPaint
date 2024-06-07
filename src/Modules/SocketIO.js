const {createCell} = require('../controllers/cell')
const {closeCanvas} = require('../controllers/canvas');
const {isAdmin} = require('../controllers/user');




module.exports = function (io, _arrCell, _canvasId) {
    let arrCell = _arrCell // Define arrCell here
    canvasId = _canvasId;

    io.on('connection', (socket) => {
        const clientIp = socket.request.connection.remoteAddress;
        console.log(`A client connected from ${clientIp}`);
        // Send 'initialData' to the new client
        socket.emit('initialData', arrCell);

        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });

        socket.on('Client_SendCell', (x, y, color) => {
            console.log('Client_SendCell', x, y, color);
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


        socket.on('Client_Send_ClearBoard', (token) => {
            // Verify the token and check if the user is an admin
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.log('Token verification failed:', err);
                } else if (isAdmin(decoded._id)) {
                    // create new canvas after clear
                    closeCanvas(canvasId);
                    createCanvas('Canvas', 200).then((res) => {
                        canvasId = res._id;
                        arrCell = [];
                        io.emit('Server_Send_ClearBoard');
                    });
                }
            });
        });




    });
}