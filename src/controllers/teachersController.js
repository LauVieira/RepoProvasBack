const teachersRepository = require('../repositories/teachersRepository');

async function getTeachers (req, res) {
    try {
        const teachers = await teachersRepository.getAllTeachers();
        res.status(200).send(teachers);
    }
    catch {
        res.sendStatus(500);
    }
}

async function getSubjectsByTeacher (req, res) {
    const teacherId = parseInt(req.params.id);

    if (teacherId < 1 || teacherId > 20) return res.sendStatus(422);

    try {
        const subjectsByTeacher = await teachersRepository.getTeacherSubjects(teacherId);
        res.status(200).send(subjectsByTeacher);
    }
    catch {
        res.sendStatus(500);
    }
}

async function getTeachersAndExams (req, res) {
    try {
        const teachersList = await teachersRepository.getTeachersWithCount();
        res.status(200).send(teachersList);
    }
    catch {
        res.sendStatus(500);
    } 
}

module.exports = {
    getTeachers,
    getSubjectsByTeacher,
    getTeachersAndExams
}
