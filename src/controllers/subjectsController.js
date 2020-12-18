const subjectsRepository = require('../repositories/subjectsRepository');

async function getSubjectsAndExams (req, res) {
    try {
        const subjectsList = await subjectsRepository.getSubjectsWithCount();
        res.status(200).send(subjectsList);
    }
    catch {
        res.sendStatus(500);
    } 
}

module.exports = {
    getSubjectsAndExams
}