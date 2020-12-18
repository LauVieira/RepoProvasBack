const connection = require('../database');
const utils = require('../utils');

async function postNewExam (examObj) {
    const sanitisedObj = utils.sanitiseObjStrings(examObj);
    const { name, url, type, teacherId, subjectId } = sanitisedObj;
    const queryString = `
        INSERT INTO exams (name, url, type, "teacherId", "subjectId") 
        VALUES ($1, $2, $3, $4, $5)
    `;
    await connection.query(queryString, [name, url, type, teacherId, subjectId] );
}

module.exports = {
    postNewExam
}
