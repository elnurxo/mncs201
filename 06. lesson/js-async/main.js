const btn = document.querySelector("#btn");

// setTimeout(() => {
//     console.log('hey after 5 seconds!');
// }, 5000);

// setInterval(() => {
//     console.log('hey every 1 second');
// }, 1000);

// let counter = 0;
// btn.addEventListener("click", () => {
//   const intervalId = setInterval(() => {
//     const h1 = document.querySelector("h1");
//     counter++;
//     h1.textContent = counter;
//   }, 1000);
//   const stopBtn = document.querySelector("#stop");

//   stopBtn.addEventListener("click", () => {
//     clearInterval(intervalId);
//   });
// });

//async function

// console.log("hey before timeout");

// setTimeout(() => {
//   console.log("inside timeout");
// }, 0);

// console.log("hey after timeout");

// async function fetchData() {
//   // Return a new Promise that resolves after the timeout
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const data = [
//         { id: 1, name: "cola" },
//         { id: 2, name: "sprite" },
//       ];
//       resolve(data); // Resolve the Promise with the data
//     }, 1000);
//   });
// }

// Example usage with async/await
// (async () => {
//   const result = await fetchData();
//   console.log(result); // Logs the data after 1 second
// })();

//Promise object
// const num = 56;
// const promiseObj = new Promise((resolve, reject) => {
//   if (num > 0) {
//     resolve(num);
//   } else {
//     reject("number cannot be negative");
//   }
// })
//   .then((data) => {
//     return data;
//   })
//   .then((data) => {
//     return (data *= 2);
//   })
//   .then((data) => {
//     return "test" + data;
//   })
//   .catch((err) => {
//     console.log("error: ", err);
//   });

// async function myFunction() {
//   return "Hello";
// }

// const x = await myFunction();

// console.log(x);

function asynchronous_operational_method() {
  let first_promise = new Promise((resolve, _) => resolve("Hello"));
  let second_promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(" GeeksforGeeks..");
    }, 1000);
  });
  let combined_promise = Promise.all([first_promise, second_promise]);
  return combined_promise;
}

async function display() {
  let data = await asynchronous_operational_method();
  console.log(data);
}

display();
