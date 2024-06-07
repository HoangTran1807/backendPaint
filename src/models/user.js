const Schema = require('mongoose').Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    status: {
        type: String,
        default: 'active'
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = userSchema;