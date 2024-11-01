// const passInp = document.querySelector("#pass");
// const passValidator = document.querySelector("#pass-validator");
// const submitBtn = document.querySelector("#btn");
//password validator - min 1 lower_case,
//min 1 UPPER_CASE, min 1 digit, length 8

// Minimum eight characters, at least one letter, one number and one special character:
// passInp.addEventListener("keyup", function (event) {
//   //regex - regular expression
//   if (
//     event.target.value.match(
//       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
//     )
//   ) {
//     passInp.style.borderColor = "green";
//     passValidator.textContent = "strong password";
//     passValidator.style.color = "green";
//     submitBtn.removeAttribute("disabled", true);
//   } else {
//     passInp.style.borderColor = "red";
//     passValidator.textContent = "weak password";
//     passValidator.style.color = "red";
//     submitBtn.setAttribute("disabled", true);
//   }
// });

// const output = document.querySelector(".output");
// document.querySelector("#form").addEventListener("submit", function (event) {
//   event.preventDefault();
//   console.log(passInp.value);
//   //   output.innerHTML = passInp.value;
//   //   passInp.value = "";
// });

// document.body.addEventListener("mouseover", function () {
//   console.log(document.cookie);
// });
// console.log(new URLSearchParams(location.search).get("pass"));
// output.innerHTML = new URLSearchParams(location.search).get("pass");

const params = new URLSearchParams(window.location.search); // Added .search for URL query parameters
const fName = params.get("name");

console.log(fName);

if (fName) {
  const messageElement = document.getElementById("message");

  if (messageElement) {
    messageElement.innerHTML = `Hello ${fName}`;
  } else {
    console.warn("Element with id 'message' not found");
  }
}
