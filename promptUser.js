const prompt = require('prompt-sync')();
const { addStudent,deleteStudent,viewStudents } = require('./studentController.js');

const promptUser=async()=> {
    while(true){
        const operation = prompt('Enter operation (add, delete, view, exit): ').toLowerCase();
        if (operation === 'exit') {
            console.log("Exiting...");
            process.exit(0);
        }

        switch(operation) {
            case 'add':
                const name = prompt('Enter student name: ');
                const dob = prompt('Enter date of birth (YYYY-MM-DD): ');
                const standard = prompt('Enter standard: ');
                const section = prompt('Enter section: ');
                try{
                    await addStudent(name, dob, standard, section);
                    console.log('Returning to prompt...');
                }
                catch (error) {
                    console.error('An error occurred:', error.message);
                }
                break;

            case 'delete':
                let id = prompt('Enter the student ID to delete: ');
                    try{
                        await deleteStudent(id);
                        console.log('Returning to prompt...');
                    }
                    catch (error) {
                        console.error('An error occurred:', error.message);
                    }
                    break;
            case 'view':
                try{
                    await viewStudents(); ;
                    console.log('Returning to prompt...');
                }
                catch (error) {
                    console.error('An error occurred:', error.message);
                }
                break;
            default:
                console.log('Invalid operation. Please enter add, delete, view, or exit.');
        }
    }
}
promptUser();
