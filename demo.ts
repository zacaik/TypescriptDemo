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
teacher.name = "123";
console.log(teacher.getName());