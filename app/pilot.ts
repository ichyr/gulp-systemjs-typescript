import {Person} from "./person";

class Pilot extends Person {
   id: string;

   constructor(name: string, id: string) {
       super(name);
       this.id = id;
   }

   pilotGreeting() {
       super.great();
       console.log(`You are being served by pilot with ID: ${this.id}`);
   }
}

let a: Pilot = new Pilot('Sandy', 'black-goat');
a.pilotGreeting();