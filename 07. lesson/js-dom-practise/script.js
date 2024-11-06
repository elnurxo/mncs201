//getElementById, getElementsByClassName, getElementsByTagName
//querySelector, querySelectorAll

// const h1 = document.querySelector("h1");
// const p = document.querySelector("#text");
// const img = document.querySelector(".image");

// //text Content, style, attribute
// h1.style.backgroundColor = "red";
// p.textContent = "updated paragraph content";
// img.setAttribute(
//   "src",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWCVnMftmnJZ8Nis5HnBeuahDMftylU9guag&s"
// );

//appending element
// const link = document.createElement("a");
// link.textContent = "google";
// link.setAttribute("href", "https://google.com");
// link.setAttribute("target","_blank");

// document.body.append(link);

// const btn = document.querySelector("button");

// btn.addEventListener("click", function(){
//   window.alert("button clicked!");
// });

const inc = document.querySelector("#increment");
const dec = document.querySelector("#decrement");
const reset = document.querySelector("#reset");
const counter = document.querySelector("#counter");

inc.addEventListener("click", function () {
  counter.textContent = Number(++counter.textContent);
});
dec.addEventListener("click", function () {
  counter.textContent = Number(--counter.textContent);
});
reset.addEventListener("click", function () {
  counter.textContent = 0;
});

const inp = document.querySelector("#inp");

inp.addEventListener("keyup", function (e) {
  const output = document.querySelector("#output");
  if (e.target.value == "") {
    output.textContent = "...";
  } else {
    output.textContent = e.target.value;
  }
});
