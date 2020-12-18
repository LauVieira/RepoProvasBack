const examsRepository = require('../repositories/examsRepository');
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

    const { error } = examsSchema.postExam.validate(newExam);
    if (error) return res.sendStatus(422);

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

module.exports = {
    postExam,
    examsByTeacher
}