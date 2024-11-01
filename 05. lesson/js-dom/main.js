// console.log(document);

// console.log(document.getElementById("text"));

// console.log(document.getElementsByTagName("h1"));

// console.log(document.getElementsByClassName("btn"));

// console.log(document.querySelector("h1"));

// const list = document.querySelector("ul");

// console.log(list.lastElementChild)

// const p = document.querySelector("#text");

// console.log(p.parentElement.previousElementSibling)

// const heading = document.createElement("h1");
// const p = document.createElement("p");

// console.log(heading);

// document.body.appendChild(heading);

// const h1 = document.querySelector("h1");
// h1.textContent = 'hello world!';

// const box = document.querySelector(".box");

// box.before(h1);

// box.innerHTML += `<p>code inserted from js</p>`;

// const googleLink = document.querySelector("#google");

// console.log(googleLink.removeAttribute("href"));

// document.querySelector("#btn").addEventListener("click", function () {
// //   if(document.querySelector("btn").style.backgroundColor === "yellow")

//   if (this.getAttribute("data-active") === "false") {
//       document.querySelector(".box").style.backgroundColor = "yellow";
//       this.textContent = "turn off";
//       this.setAttribute("data-active", "true");
//   } else {
//       document.querySelector(".box").style.backgroundColor = "black";
//       this.textContent = "turn on";
//       this.setAttribute("data-active", "false");
//   }
// });


// const box = document.querySelector("div");

// console.log(box.classList.contains("test"));

// const username = window.prompt("enter username");

// window.alert(username);

// const checkAge = window.confirm("are you older than 18?")

// document.querySelector("box").innerHTML = username;


// console.log(window.history.forward());


const url = new URLSearchParams(location.search).get("name");

console.log(url);