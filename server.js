const express=require('express');
const http = require('http');
const { viewStudentById } = require('./studentController'); 
const app=express();
const port = 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log('Running...');
});

app.get('/Status',(req,res)=>{
    res.send("Running in Web...");
})

app.get('/Student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await viewStudentById(id);
        if (student) {
            res.send(`Student Details: ID: ${student.Id}, Name: ${student.name}, DOB: ${new Date(student.dob).toDateString()}, Age: ${student.age}, Standard: ${student.Standard}, Section: ${student.Section}`);
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching student details: ' + error.message);
    }
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        console.error('Server error:', err);
    }
});

