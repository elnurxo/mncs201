const btn = document.querySelector("#btn");
const boxDiv = document.querySelector(".box");

btn.addEventListener("click", function () {
  boxDiv.classList.toggle("dark");
  //   if (boxDiv.classList.contains("dark")) {
  //     boxDiv.classList.remove("dark");
  //     this.textContent = "click me!";
  //   } else {
  //     boxDiv.classList.add("dark");
  //     this.textContent = "clicked";
  //   }
});
const inp = document.querySelector("#search");
inp.addEventListener("keyup", (e) => {
  document.querySelector("#input-val").textContent = e.target.value;
});

const bgcSelect = document.querySelector("#bgc");

bgcSelect.addEventListener("change", (e) => {
  document.body.style.backgroundColor = e.target.value;
});

window.addEventListener("scroll", () => {
  if (document.body.scrollTop >= 200) {
    document.body.style.backgroundColor = "black";
  }
  else{
    document.body.style.backgroundColor = "white";
  }
});

boxDiv.addEventListener("mouseover",()=>{
    window.alert("mouse over box");
})
