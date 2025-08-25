let panier = [];

let products = [
  { id: 1, name: "jeans", price: 80 },
  { id: 2, name: "casquette", price: 40 },
  { id: 3, name: "t-shirt", price: 60 },
  { id: 4, name: "shoes", price: 180 },
];

const productsDisplay = document.getElementById("produits");

products.forEach((product) => {
  productsDisplay.innerHTML += `
    <div class = "product">
    <span> ${product.name} - ${product.price}$</span>
    <button class="btn" onClick="addToCart(${product.id})"> ajouter au panier </button>
    </div>
    `;
});

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const item = panier.find((item) => item.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    panier.push({ ...product, quantity: 1 });
  }

  renederCart();
}

function removeFromCart (id){
    panier = panier.filter(p => p.id !== id)
    renederCart() 
}

function renederCart() {
  const cartContainer = document.getElementById("cart");
  const totalConatiner = document.getElementById("total");
  if (panier.length === 0) {
    cartContainer.innerHTML = "<p> aucun produit dans le panier :/ </p>";
    totalConatiner.innerText = 0;
    return;
  }

  cartContainer.innerHTML = panier
    .map(
      (item) => `
    <div class="product">
    <span>${item.name} x ${item.quantity} - ${
        item.price * item.quantity
      }$</span>
    <button class="btn" onClick="removeFromCart(${item.id})"> supprimer du panier </button>
    `
    )
    .join("");
  const total = panier.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  totalConatiner.innerText = total;
}
