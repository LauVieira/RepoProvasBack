const teachersRepository = require('../repositories/teachersRepository');
const subjectsRepository = require('../repositories/subjectsRepository');

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
    const teacherId = req.params.id;

    try {
        const subjectsByTeacher = await teachersRepository.getTeacherSubjects(teacherId);

        res.status(200).send(subjectsByTeacher);
    }

    catch {
        res.sendStatus(500);
    }
}

module.exports = {
    getTeachers,
    getSubjectsByTeacher
}