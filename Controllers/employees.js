const employees = require('../Models/employees');
const department = require('../Models/department');
const employeetrack = require('../Models/employeeProjectTrack');
const projects = require('../Models/projects')
const mongoose = require('mongoose');

exports.addEmployee = async (req, res) => {
    try {

        const { fName, Lname, departmentId, age } = req.body;

        if (!fName || !Lname || !departmentId || !age) {
            return res.status(422).json({
                message: 'Unable to add employee one or more fields are missing',
                status: 422,
                ok: false
            });
        }

        if (!Number(age) || age < 1 || age > 100) {
            return res.status(422).json({
                message: 'Please provide a valid age',
                status: 422,
                ok: false
            });
        }

        const num = await employees.countDocuments({});

        let empId = "";
        if (num < 10) {
            empId = "EMP00" + num;
        }
        if (num > 9 && num < 100) {
            empId = "EMP0" + num;
        }
        if (num > 99) {
            empId = "EMP" + num;
        }
        const result = await employees.create({
            _id: new mongoose.Types.ObjectId(),
            fName: fName,
            Lname: Lname,
            employeeId: empId,
            departmentId: departmentId,
            age: age,
        })

        if (result) {
            return res.status(200).json({
                message: 'Employee added successfully',
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

exports.getALLEmployees = async (req, res) => {
    const search = req.query.search;
    let filter = {};
    let filterData = [];
    let projData = [];
    let currentData = {};
    let rec = {};
    if (search) {
        filter.name = { '$regex': search, '$options': 'i' };
    }

    const result = await employees.find(filter);

    if (result && result.length) {
        Promise.all(result.map(async (emp) => {
            const depInfo = await department.findOne({ departmentId: emp.departmentId });
            const trackInfo = await employeetrack.find({ employeeId: emp._id });
            Promise.all(trackInfo.map(async (proj) => {
                const projName = await projects.findById(proj.projectId);
                currentData = {
                    projectId: proj.projectId,
                    projectName: projName.name
                }
                projData.push(currentData);

            })
            )
            rec = {
                employeeId: emp.employeeId,
                employeeName: employees.name,
                departmentId: emp.departmentId,
                departmentName: depInfo ? depInfo.projName : null,
                currentlyWorkingProject: projData,
            }
            filterData.push(rec);
            console.log(filterData);
        })
        )

        res.status(200).json({
            message: 'Here are records',
            status: 200,
            employees: filterData ? filterData : null,
            ok: "success",
        });
    }
};

exports.uploadFile = async (req, res) => {
    try {



    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
            error: error,
            ok: false
        });
    }
};