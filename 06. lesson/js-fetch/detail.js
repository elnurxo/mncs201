const id = new URLSearchParams(location.search).get("id");
const catName = document.querySelector("#cat-name");
const catDesc = document.querySelector("#cat-desc");
const catId = document.querySelector("#cat-id");

document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://northwind.vercel.app/api/categories/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      catName.textContent = data.name;
      catDesc.textContent = data.description;
      catId.textContent = data.id;
    });
});

document.querySelector("#go-back").addEventListener("click", () => {
  window.history.back();
});
