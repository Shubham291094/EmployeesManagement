const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: String,
    name: String,
    startedOn: { type: Date, default: Date.now()}
});

module.exports = new mongoose.model('projects', projectSchema);