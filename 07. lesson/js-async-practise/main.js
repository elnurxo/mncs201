const btn = document.querySelector("button");

btn.addEventListener("click", async function () {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  //filter - price > 110
  //find - id = 6
  //sort - price

  console.log(data);

  console.log(
    data.filter(function (product) {
      return product.price > 100;
    })
  );

  console.log(
    data.find(function (product) {
      return product.id === 6;
    })
  );

  console.log(
    data.sort(function (product1, product2) {
      return product1.price - product2.price;
    })
  );

  const totalPrice = data.reduce(function (acc, currentVal) {
    return (acc += currentVal.price);
  }, 0);

  console.log(totalPrice / data.length);
});
