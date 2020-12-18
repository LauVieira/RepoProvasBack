const examsRepository = require('../repositories/examsRepository');
const examsSchema = require('../schemas/examsSchema');

// no front: axios.post(`http://localhost:3000/api/exams/${teacherId}/${subjectId}`, { name, url, type });
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

module.exports = {
    postExam
}