class Person {
    name = "lee";
    getName() {
        return this.name;
    }
}

class Teacher extends Person {
    getName() {
        return super.getName();
    }
}

const teacher = new Teacher();
console.log(teacher.getName());