const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const setupSocket = require('./src/Modules/SocketIO');
require('./src/config/mongose')

const {getCurrCanvasId} = require('./src/controllers/canvas.js');
const {getCellsByCanvasIdUNI} = require('./src/controllers/cell.js');
const {convertCellsToArr} = require('./src/controllers/convert.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
      origin:"*"
    },
  });

app.use(cors());

//khi server vừa chạy lấy array cell hiện tại từ db
var canvasId = undefined;
var arrCell = [];
getCurrCanvasId().then((res) => {
    canvasId = res.toString();
    getCellsByCanvasIdUNI(canvasId).then((res) => {
        arrCell = convertCellsToArr(res);
        setupSocket(io, arrCell, canvasId);
    });
    

});





const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
