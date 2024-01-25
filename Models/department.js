const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    departmentId: String,
    name: String,
    createdOn: { type: Date, default: Date.now()}
});

module.exports = new mongoose.model('department', departmentSchema);