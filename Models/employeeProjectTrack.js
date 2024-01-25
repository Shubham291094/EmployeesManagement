const mongoose = require('mongoose');
const employeeTrackSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "employee", required: true },
    joined: { type: Date},
    exit: { type: Date},
});

module.exports = new mongoose.model('employeetrack', employeeTrackSchema);