const job = {
  title: 'Developer',
  location: 'New York',
  salary: 50000,
};

class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.location = place;
    this.salary = salary;
  }
  describe() {
    console.log(`I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}.`);
  }
}
const developer = new Job('Developer', 'New York', 50000);

console.log(job);
console.log(developer);
developer.describe();

const date = new Date();
console.log(date.toDateString());
console.log(date.toISOString());

// Destructuring arrays
const input = [ 'Joe', 'Schmoe', 'and the third thing' ];
const [ first, last ] = input;
console.log(first);
console.log(last);

// Destructuring objects
const { title, location } = job;
console.log(title);
const { title: jobTitle, location: jobLocation } = job;
console.log(jobLocation);