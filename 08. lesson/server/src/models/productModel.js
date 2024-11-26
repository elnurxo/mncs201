let products = [
  {
    id: 1,
    name: "Lenovo Legion",
    price: 1200,
  },
  {
    id: 2,
    name: "MacBook",
    price: 2500,
  },
  {
    id: 3,
    name: "HP Pavilion",
    price: 3500,
  },
  {
    id: 4,
    name: "Dell",
    price: 1800,
  },
  {
    id: 5,
    name: "Lenovo Legion 5 Pro",
    price: 4200,
  },
];

module.exports = {
  getAllProducts: () => products,
  getProductById: (id) => products.find((prod) => prod.id === id),
  addProduct: (product) => {
    let lastId = products[products.length - 1].id;
    const newProduct = { id: ++lastId, ...product };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: (id, updatedProduct) => {
    const index = products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      products[index] = { id, ...updatedProduct };
      return products[index];
    }
    return null;
  },
  deleteProduct: (id) => {
    const index = products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      return deletedProduct;
    }
    return null;
  },
};
