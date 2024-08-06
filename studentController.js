const { executeQuery } = require('./db');
const Student = require('./student');

const addStudent = async (name, dob, standard, section) => {
    try {
        const newStudent = new Student(name, dob, standard, section);
        const insertQuery = `INSERT INTO students (name, dob, standard, section, age) VALUES ('${newStudent.name}', '${newStudent.dob.toISOString().split('T')[0]}','${newStudent.standard}', '${newStudent.section}', ${newStudent.age})`;
        await executeQuery(insertQuery, [newStudent.name, newStudent.dob.toISOString().split('T')[0], newStudent.standard, newStudent.section, newStudent.age]);
        console.log('Student added successfully:', newStudent);
    } catch (err) {
        console.error('Error adding student:', err.message);
    }
};

const deleteStudent = async (id) => {
    try {
        const query = 'DELETE FROM students WHERE Id = ?';
        const results = await executeQuery(query, [id]);
        if (results.affectedRows === 0) {
            console.log('Student not found.');
        } else {
            console.log('Student deleted successfully.');
        }
    } catch (err) {
        console.error('Error deleting student:', err.message);
    }
};

const viewStudents = async () => {
    try {
        const query = 'SELECT Id, name, dob, age, standard AS Standard, section AS Section FROM students';
        const results = await executeQuery(query);
        if (results.length === 0) {
            console.log('No students available.');
        } else {
            console.log('Student List:');
            results.forEach(student => {
                console.log(`ID: ${student.Id}, Name: ${student.name}, DOB: ${new Date(student.dob).toDateString()}, Age: ${student.age}, Standard: ${student.Standard}, Section: ${student.Section}`);
            });
        }
    } catch (err) {
        console.error('Error fetching students:', err.message);
    }
};

const viewStudentById = async (id) => {
    try {
        const query = 'SELECT Id, name, dob, age, standard AS Standard, section AS Section FROM students WHERE Id = ?';
        const results = await executeQuery(query, [id]);
        if (results.length === 0) {
            return null; 
        } else {
            return results[0]; 
        }
    } catch (err) {
        console.error('Error fetching student:', err.message);
        throw err;
    }
};

module.exports = { addStudent, deleteStudent, viewStudents, viewStudentById };
