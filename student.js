class Student {
    constructor(name, dob, standard, section) {
        this.name = name;
        this.dob = new Date(dob); 
        this.standard=standard;
        this.section = section;
        this.age = this.calculateAge();
    }

    calculateAge() {
        const today = new Date();
        let age = today.getFullYear() - this.dob.getFullYear();
        const monthDifference = today.getMonth() - this.dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.dob.getDate())) {
            age--;
        }
        return age;
    }
}

module.exports = Student;