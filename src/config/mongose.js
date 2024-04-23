const mongoose = require('mongoose');

// Kết nối tới MongoDB local
mongoose.connect('mongodb+srv://tranhuuhoang692:Hades2k2%40@mycluster.bstxaul.mongodb.net/Paint?retryWrites=true&w=majority&appName=MyCluster');

const db = mongoose.connection;

// Xử lý sự kiện khi kết nối thành công
db.on('connected', () => {
    console.log('Connected to MongoDB at mycluster.bstxaul.mongodb.net');
});

// Xử lý sự kiện khi có lỗi kết nối
db.on('error', (error) => {
    console.error('Error connecting to MongoDB local:', error);
});