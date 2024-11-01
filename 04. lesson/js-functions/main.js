//array basic methods (searching, sorting)
// let numbers = [1, 2, 4, 5, 6, 7, 9, 10];

// const newNumbers = numbers.splice(1, 1);

// console.log(newNumbers);

//pop, push, shift, unshift

// numbers.push(32, 33, 34);

// numbers.pop();

// numbers.unshift(0, -1, -2);

// numbers.shift();

// delete numbers[3];

// console.log(numbers);

// let websites = [
//   "https://google.com",
//   "https://youtube.com",
//   "https://turbo.az",
//   "http://demo.az",
//   "http://risk.az",
//   "https://test.uk",
// ];
// let numbers = [1, 2, 4, 5, 6, 7, 9, 10];

// console.log(numbers.filter((num) => num > 7));
// console.log(websites.includes("https://turbo.az", 3));
// websites.splice(websites.indexOf("http://demo.az"), 1);
// console.log(websites);

//reusable code block
// regular function, anonymous function, arrow functions (ECMA6)

//function invoke - call
//ad, soyad, yash, GPA => 'salam john doe, siz 1999 ilde dogulmusunuz ve imtahandan kechdiniz'

// function getStudentInfo(name, surname, age, gpaArr) {
//   //ortalama gpa
// //   let GPA =
// //     gpaArr.reduce((acc, num) => {
// //       return (acc += num);
// //     }, 0) / gpaArr.length;
//     const check = gpaArr.every((mark)=>{
//         return mark > 51;
//     });

//   let result = `hey ${name} ${surname}, you were born in ${
//     new Date().getFullYear() - age
//   } and you ... the exam`;

//   if (check) result = result.replace("...", "passed");
//   else result = result.replace("...", "failed");

//   return result;
// }

// let info = getStudentInfo("john", "doe", 28, [55, 95, 56, 85]);
// console.log(info);

//local variable, outer variable, pure function
// function greetPerson(fullName) {
//   return `hello ${fullName}`;
// }
//anonym func - function expression
// const greetAnonym = function (fullName) {
//   return `hello ${fullName}`;
// };

// //arrow func
// const greetArrow = (fullName) => {
//     return `hello ${fullName}`
// };

// console.log(greetAnonym("bella"));
// console.log(greetArrow("bella"));

//IIFE
// (function(x,y){
//     console.log('sum: ',x+y);
// })(5,4);

//callback

//HIGHER ORDER FUNC
// function
// function greet(name, x) {
//     console.log('Hi' + ' ' + name);
//     x();
// }

// // callback function
// function callMe() {
//     console.log('I am callback function');
// }

// // passing function as an argument
// greet('Peter', callMe);

// const car = {
//   brandName: "BMW",
//   modelName: "X5",
//   price: 30_000,
//   milage: 150_000,
//   fuelFor1KM: 8,
//   fuel: 20,
//   fuelCapacity: 60,
//   drive: function (km) {
//     if (km * this.fuelFor1KM <= this.fuel) {
//       this.milage += km;
//       this.fuel -= km * this.fuelFor1KM;
//       console.log(`current milage: ${this.milage}\nfuel: ${this.fuel}`)
//     }
//     else{
//         console.log('kasibsan!');
//     }
//   },
//   getFuel: function(newFuel){
//     if(newFuel+this.fuel > this.fuelCapacity){
//         this.fuel = this.fuelCapacity;
//     }
//     else{
//         this.fuel += newFuel;
//     }
//   }
// };

// car.drive(2);
// car.getFuel(20);
// console.log(car);

// const employees = [
//   {
//     id: 1,
//     fullName: "Alice Johnson",
//     salary: 5000,
//     department: "HR",
//     experienceYear: 5,
//   },
//   {
//     id: 2,
//     fullName: "Bob Smith",
//     salary: 7000,
//     department: "IT",
//     experienceYear: 8,
//     promotion: function () {
//       if (this.experienceYear > 5) {
//         this.salary += (this.salary * 25) / 100;
//       }
//     },
//   },
//   {
//     id: 3,
//     fullName: "Charlie Davis",
//     salary: 4500,
//     department: "Finance",
//     experienceYear: 3,
//   },
//   {
//     id: 4,
//     fullName: "Diana King",
//     salary: 6000,
//     department: "IT",
//     experienceYear: 6,
//   },
//   {
//     id: 5,
//     fullName: "Eve Adams",
//     salary: 5500,
//     department: "Marketing",
//     experienceYear: 4,
//   },
//   {
//     id: 6,
//     fullName: "Frank Lee",
//     salary: 5200,
//     department: "Sales",
//     experienceYear: 5,
//   },
//   {
//     id: 7,
//     fullName: "Grace Miller",
//     salary: 4800,
//     department: "Finance",
//     experienceYear: 2,
//   },
//   {
//     id: 8,
//     fullName: "Henry Wilson",
//     salary: 6500,
//     department: "Operations",
//     experienceYear: 7,
//   },
//   {
//     id: 9,
//     fullName: "Ivy Baker",
//     salary: 5300,
//     department: "HR",
//     experienceYear: 4,
//   },
//   {
//     id: 10,
//     fullName: "Jack Turner",
//     salary: 6100,
//     department: "IT",
//     experienceYear: 6,
//   },
// ];

// function avgSalary(arr, department) {
//   let sum = 0;
//   let counter = 0;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].department === department) {
//       sum += arr[i].salary;
//       counter++;
//     }
//   }
//   return sum / counter;
// }

// console.log(avgSalary(employees, "IT").toFixed(2));

// const newEmp = {
//   id: 2,
//   fullName: "Bob Smith",
//   salary: 7000,
//   department: "IT",
//   experienceYear: 2,
//   promotion: function () {
//     if (this.experienceYear > 5) {
//       this.salary += (this.salary * 25) / 100;
//     }
//   },
// };

// console.log(newEmp.salary);
// newEmp.promotion();
// console.log(newEmp.salary);

//JS - OOP
// class User {
//   username;
//   email;
//   #password;
//   constructor(username, email, password) {
//     this.username = username;
//     this.email = email;
//     this.#password = password;
//     this.isLogged = false;
//   }
//   //methods
//   login(emailOrUsername, password) {
//     if (
//       emailOrUsername === this.email ||
//       (emailOrUsername === this.username && this.#password === password)
//     ) {
//       this.isLogged = true;
//     } else {
//       console.log("invalid credentials!");
//     }
//   }

//   getPassword() {
//     this.#password;
//   }
//   //regex
//   setPassword(val) {
//     if(val.trim()===''){
//         return;
//     }
//     else{
//         this.#password = val;
//     }
//   }
// }

// const user1 = new User("elnur", "elnur@gmail.com", "Elnur123");

// class Animal {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   makeNoise() {
//     console.log(`${this.name} makes noise`);
//   }
// }

// class Cat extends Animal {
//   constructor(name, age, eyeColor) {
//     super(name, age);
//     this.eyeColor = eyeColor;
//   }

//   //method override
// //   makeNoise() {
// //     console.log(`${this.name} meows`);
// //   }
// }

// const lion = new Animal("simba", 23);
// const garfield = new Cat("garfield", 12);
// lion.makeNoise();
// garfield.makeNoise();




