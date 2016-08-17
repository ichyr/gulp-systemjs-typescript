export class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    great() {
        console.log(`Hello, ${this.name}!`);
    }
}