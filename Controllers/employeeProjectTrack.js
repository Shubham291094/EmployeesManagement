const employeetrack = require('../Models/employeeProjectTrack');
const mongoose = require('mongoose');

exports.addHistory = async (req, res) => {
    try {

        const { projectId, employeeId, joinDate, exitDate } = req.body;

        if (!projectId || !employeeId || !joinDate || !exitDate) {
            return res.status(422).json({
                message: 'Unable to add employee one or more fields are missing',
                status: 422,
                ok: false
            });
        }

        if (Date(joinDate) || Date(exitDate)) {
            return res.status(422).json({
                message: 'Please provide a valid Join or exit Date',
                status: 422,
                ok: false
            });
        }

        const result = await employeetrack.create({
            _id: new mongoose.Types.ObjectId(),
            projectId: projectId,
            employeeId: employeeId,
            joined: joinDate,
            exit: exitDate,
        })

        console.log(result);
        if (result) {
            return res.status(200).json({
                message: 'Successfully added employee project history',
                status: 200,
                ok: "Success"
            });
        }


    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
            error: error,
            ok: false
        });
    }
};
