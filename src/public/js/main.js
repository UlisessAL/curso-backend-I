const socket = io();

socket.on("products", (data) => {
  renderProducts(data);
});

function renderProducts(products) {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "";

  products.map((product) => {
    const card = document.createElement("article");
    card.classList.add("cardProduct");
    card.innerHTML = `
      <h2>${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <div class='priceAndStock'>
      <p>Precio: ${product.price}</p>
      <p>Stock: ${product.stock}</p>
      </div>
      <button>Eliminar</button>
    `;
    productsContainer.appendChild(card);
    card.querySelector("button").addEventListener("click", () => {
      deleteProduct(product._id);
    });
  });
}

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

document.getElementById("btnSendProduct").addEventListener("click", () => {
  loadProduct();
});

function loadProduct() {
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
    code: document.getElementById("code").value,
    status: document.getElementById("status").value,
    img: document.getElementById("img").value,
    category: document.getElementById("category").value,
    thumbnails: [],
  };
  socket.emit("addProduct", product);
}
