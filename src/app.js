const express = require("express");
const cors = require("cors");
const app = express();

const teachersController = require('./controllers/teachersController');
const examsController = require('./controllers/examsController');

app.use(cors());
app.use(express.json());

app.get('/api/teachers/list', teachersController.getTeachers);
app.get('/api/teachers/:id/subjects', teachersController.getSubjectsByTeacher);
app.get('/api/teachers/exams', teachersController.getTeachersAndExams);

app.post('/api/exams/:teacherId/:subjectId', examsController.postExam);
app.get('/api/exams/teacher/:teacherId', examsController.examsByTeacher);

module.exports = app;


