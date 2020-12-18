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

async function getByTeacherId (teacherId) {
    const queryString = `
        SELECT exams.id, exams.name, exams.type, exams.url, subjects.name AS subject, subjects.semester 
        FROM exams JOIN subjects ON exams."subjectId" = subjects.id 
        WHERE exams."teacherId" = $1
    `;
    const examsByTeacher = await connection.query(queryString, [teacherId]);
    return examsByTeacher.rows;
}

async function getBySubjectId (subjectId) {
    const queryString = `
        SELECT exams.name, exams.type, exams.url, teachers.name AS teacher
        FROM subjects JOIN exams ON subjects.id = exams."subjectId"
        JOIN teachers ON exams."teacherId" = teachers.id
        WHERE subjects.id = $1
    `;
    const examsBySubject = await connection.query(queryString, [subjectId]);
    return examsBySubject.rows;
}

module.exports = {
    postNewExam,
    getByTeacherId,
    getBySubjectId
}
