const express = require("express");
const cors = require("cors");
const app = express();

const teachersController = require('./controllers/teachersController');

app.use(cors());
app.use(express.json());

app.get('/api/teachers/list', teachersController.getTeachers);
app.get('/api/teachers/:id/subjects', teachersController.getSubjectsByTeacher);

module.exports = app;