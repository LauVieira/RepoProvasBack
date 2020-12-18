const connection = require('../database');

async function getAllTeachers () {
    const teachersList = await connection.query('SELECT * FROM teachers ORDER BY name ASC');
    return teachersList.rows;
}

async function getTeacherSubjects (teacherId) {
    const queryString = `
        SELECT subjects.name, subjects.id FROM teachers 
        JOIN subjects_teachers AS middle ON teachers.id = middle."teacherId" 
        JOIN subjects ON middle."subjectId" = subjects.id
        WHERE teachers.id = $1
    `;
    const subjectsList = await connection.query(queryString,[teacherId]);
    return subjectsList.rows;
}

async function getTeachersWithCount () {
    const queryString = `
        SELECT teachers.name, teachers.id, COUNT(exams."teacherId") 
        FROM teachers LEFT JOIN exams ON teachers.id = exams."teacherId" 
        GROUP BY teachers.name, teachers.id 
        ORDER BY teachers.name ASC
    `;
    const teachersList = await connection.query(queryString);
    return teachersList.rows;
}

module.exports = {
    getAllTeachers,
    getTeacherSubjects,
    getTeachersWithCount
}
