const connection = require('../database');

async function getSubjectsWithCount () {
    const queryString = `
        SELECT subjects.name, subjects.id, subjects.semester, COUNT(exams."subjectId")
        FROM subjects LEFT JOIN exams ON subjects.id = exams."subjectId"
        GROUP BY subjects.name, subjects.id
        ORDER BY subjects.semester ASC
    `;
    const subjectsList = await connection.query(queryString);
    return subjectsList.rows;
}

module.exports = {
    getSubjectsWithCount
}