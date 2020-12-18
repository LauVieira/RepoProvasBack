const examsRepository = require('../repositories/examsRepository');
const subjectsRepository = require('../repositories/subjectsRepository');
const examsSchema = require('../schemas/examsSchema');

async function postExam (req, res) {
    const { teacherId, subjectId } = req.params;
    const newExam = { 
        name: req.body.name, 
        url: req.body.url, 
        type: req.body.type, 
        teacherId: parseInt(teacherId), 
        subjectId: parseInt(subjectId)
    };    

    const teacherSubjectNotRelated = await subjectsRepository.subjectOrTeacherInvalid(teacherId, subjectId);
    const { error } = examsSchema.postExam.validate(newExam);
    if (error || teacherSubjectNotRelated) return res.sendStatus(422);

    try {
        await examsRepository.postNewExam(newExam);
        return res.sendStatus(201);
    }
    catch {
        return res.sendStatus(500);
    }
}

async function examsByTeacher (req, res) {
    const teacherId = parseInt(req.params.teacherId);

    if (teacherId < 1 || teacherId > 20) return res.sendStatus(422);

    try {
        const examsList = await examsRepository.getByTeacherId(teacherId);
        return res.status(200).send(examsList);
    }
    catch {
        return res.sendStatus(500);
    }
}

async function examsBySubject (req, res) {
    const subjectId = parseInt(req.params.subjectId);

    if (subjectId < 1 || subjectId > 59) return res.sendStatus(422);

    try {
        const examsList = await examsRepository.getBySubjectId(subjectId);
        return res.status(200).send(examsList);
    }
    catch {
        return res.sendStatus(500);
    }
}

module.exports = {
    postExam,
    examsByTeacher,
    examsBySubject
}
