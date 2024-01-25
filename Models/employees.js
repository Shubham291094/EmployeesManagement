const mongoose = require('mongoose');
const employeesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeId: String,
    fName: String,
    LName: String,
    departmentId: String,
    onBoardDate: { type: Date},
    age: {type: Number}
});

module.exports = new mongoose.model('employees', employeesSchema);