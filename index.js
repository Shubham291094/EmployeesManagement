const express = require('express');
require('./db/config');
const app = express();
const bodyParser = require("body-parser");

// API routes declerations

const departmentRoutes = require('./Routes/department');
const employeesRoutes = require('./Routes/employees');
const projectRoutes = require('./Routes/projects');
const employeeProjectTrackRoutes = require('./Routes/employeeProjectTrack');

// DEPLOY BODY-PARSER LIBRARY TO HELP READ DATA FROM REQ
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use('/department', departmentRoutes);
app.use('/employee', employeesRoutes);
app.use('/project', projectRoutes);
app.use('/track', employeeProjectTrackRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'server is connected',
        status: 200,
        ok: "success"
    });
});

app.listen(5000, () => { console.log("Server Listening at port number 5000") });