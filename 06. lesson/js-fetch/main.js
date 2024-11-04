const btn = document.querySelector("#fetch-data");
const API_URL = "https://northwind.vercel.app/api/categories";
const loader = document.querySelector(".spinner-grow");
const list = document.querySelector(".list-group");

btn.addEventListener("click", async () => {
  if (loader.classList.contains("d-none")) {
    loader.classList.replace("d-none", "d-block");
  }
  const res = await fetchData(API_URL);
  list.innerHTML = "";
  console.log(res);
  for (const category of res.data) {
    const listItem = document.createElement("li");
    listItem.classList.add(
      ...["list-group-item", "d-flex", "justify-content-between"]
    );

    const link = document.createElement("a");
    link.setAttribute("href", `detail.html?id=${category.id}`);
    link.textContent = category.name;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("btn", "btn-outline-danger");

    listItem.append(link);
    listItem.append(deleteBtn);
    list.append(listItem);

    deleteBtn.addEventListener("click", async function () {
      if (window.confirm("are you sure to delete?")) {
        await fetch(`${API_URL}/${category.id}`, {
          method: "DELETE",
        });
        //html render
        this.closest("li").remove();
      }
    });
  }

  loader.classList.replace("d-block", "d-none");
  console.log(res);
});

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return {
        message: "data fetched successfully",
        data: data,
        status: response.status,
      };
    } else {
      return { message: "failed to fetch", status: response.status, data: [] };
    }
  } catch (error) {
    return error;
  }
}

//add category
const addForm = document.querySelector("#add-form");
const nameInp = document.querySelector("#name-inp");
const descInp = document.querySelector("#desc-inp");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCategory = {
    name: nameInp.value,
    description: descInp.value,
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  })
    .then((res) => res.json())
    .then((data) => {
      const listItem = document.createElement("li");
      listItem.classList.add(
        ...["list-group-item", "d-flex", "justify-content-between"]
      );
      const link = document.createElement("a");
      link.setAttribute("href", `detail.html?id=${data.id}`);
      link.textContent = data.name;

      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "delete";
      deleteBtn.classList.add("btn", "btn-outline-danger");

      listItem.append(link);
      listItem.append(deleteBtn);
      list.append(listItem);
    });
});
