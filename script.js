// =========================
// 1. SELECT HTML ELEMENTS
// =========================

// Product grid where product cards will appear.
const productGrid = document.querySelector("#productGrid");

// Message area for loading and errors.
const productMessage = document.querySelector("#productMessage");

// Cart counter in the header.
const cartCount = document.querySelector("#cartCount");

// Shopping cart panel.
const cartPanel = document.querySelector("#cartPanel");

// Container where cart products will appear.
const cartItems = document.querySelector("#cartItems");

// Element that displays the total price.
const cartTotal = document.querySelector("#cartTotal");

// Header Cart button.
const cartButton = document.querySelector(".cart-button");

// Close button inside the cart panel.
const closeCartButton = document.querySelector("#closeCartButton");


// =========================
// 2. SHOPPING CART
// =========================

// This array stores products added to the cart.
// Each cart item will also have a quantity property.
const cart = [];


// =========================
// 3. LOAD PRODUCTS FROM API
// =========================

async function getProducts() {

  try {

    // Show a loading message.
    productMessage.textContent = "Loading products...";

    // Request products from DummyJSON.
    const response = await fetch(
      "https://dummyjson.com/products"
    );

    // Throw an error if the request was unsuccessful.
    if (!response.ok) {
      throw new Error("Request failed");
    }

    // Convert the response into JavaScript data.
    const data = await response.json();

    // The products are stored inside data.products.
    const products = data.products;

    // Clear the loading message.
    productMessage.textContent = "";

    // Create a card for each product.
    products.forEach((product) => {

      // =========================
      // 4. CREATE PRODUCT CARD
      // =========================

      const card = document.createElement("article");
      card.classList.add("product-card");


      // =========================
      // 5. CREATE PRODUCT IMAGE
      // =========================

      const image = document.createElement("img");

      image.src = product.thumbnail;
      image.alt = product.title;
      image.classList.add("product-image");

      card.appendChild(image);


      // =========================
      // 6. CREATE CONTENT CONTAINER
      // =========================

      const content = document.createElement("div");
      content.classList.add("product-content");

      card.appendChild(content);


      // =========================
      // 7. CREATE CATEGORY
      // =========================

      const category = document.createElement("p");

      category.textContent = product.category;
      category.classList.add("product-category");

      content.appendChild(category);


      // =========================
      // 8. CREATE PRODUCT TITLE
      // =========================

      const title = document.createElement("h2");

      title.textContent = product.title;
      title.classList.add("product-title");

      content.appendChild(title);


      // =========================
      // 9. CREATE DESCRIPTION
      // =========================

      const description = document.createElement("p");

      description.textContent = product.description;
      description.classList.add("product-description");

      content.appendChild(description);


      // =========================
      // 10. CREATE PRICE AND RATING CONTAINER
      // =========================

      const meta = document.createElement("div");
      meta.classList.add("product-meta");

      content.appendChild(meta);


      // =========================
      // 11. DISPLAY PRICE
      // =========================

      const price = document.createElement("span");

      // Display the price with two decimal places.
      price.textContent = `€${product.price.toFixed(2)}`;
      price.classList.add("product-price");

      meta.appendChild(price);


      // =========================
      // 12. DISPLAY RATING
      // =========================

      const rating = document.createElement("span");

      rating.textContent = `★ ${product.rating}`;
      rating.classList.add("product-rating");

      meta.appendChild(rating);


      // =========================
      // 13. CREATE ADD TO CART BUTTON
      // =========================

      const addButton = document.createElement("button");

      addButton.textContent = "Add to Cart";
      addButton.classList.add("add-cart-button");

      content.appendChild(addButton);


      // =========================
      // 14. ADD PRODUCT TO CART
      // =========================

      addButton.addEventListener("click", () => {

        // Check whether this product is already in the cart.
        const existingProduct = cart.find(
          (item) => item.id === product.id
        );

        if (existingProduct) {

          // If the product exists, increase its quantity.
          existingProduct.quantity++;

        } else {

          // Otherwise, add it to the cart with quantity 1.
          cart.push({
            ...product,
            quantity: 1
          });

        }

        // Refresh the cart counter and cart contents.
        updateCart();

      });


      // =========================
      // 15. ADD CARD TO PRODUCT GRID
      // =========================

      productGrid.appendChild(card);

    });

  } catch (error) {

    // Display an error if products cannot be loaded.
    productMessage.textContent =
      "Failed to load products. Please try again.";

    console.error("Error loading products:", error);

  }

}


// =========================
// 16. UPDATE SHOPPING CART
// =========================

function updateCart() {

  // Calculate the total number of individual items.
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Update the number shown in the header.
  cartCount.textContent = totalQuantity;

  // Remove the previous cart display.
  cartItems.replaceChildren();

  // Start the total price at zero.
  let totalPrice = 0;

  // Display a message when the cart is empty.
  if (cart.length === 0) {

    cartItems.textContent = "Your cart is empty.";

  }

  // Create a row for each product in the cart.
  cart.forEach((item) => {

    const row = document.createElement("div");
    row.classList.add("cart-item");

    // Display the product name and quantity.
    const name = document.createElement("p");
    name.textContent = `${item.title} × ${item.quantity}`;

    // Calculate the price for this product's quantity.
    const itemPrice = document.createElement("p");
    const subtotal = item.price * item.quantity;

    itemPrice.textContent = `€${subtotal.toFixed(2)}`;

    // Add this product's subtotal to the cart total.
    totalPrice += subtotal;

    // Add the name and subtotal to the row.
    row.appendChild(name);
    row.appendChild(itemPrice);

    // Add the row to the cart panel.
    cartItems.appendChild(row);

  });

  // Display the final total price.
  cartTotal.textContent = `Total: €${totalPrice.toFixed(2)}`;

}


// =========================
// 17. OPEN SHOPPING CART
// =========================

cartButton.addEventListener("click", () => {

  // Show the cart panel.
  cartPanel.hidden = false;

  // Refresh its contents before displaying them.
  updateCart();

});


// =========================
// 18. CLOSE SHOPPING CART
// =========================

closeCartButton.addEventListener("click", () => {

  // Hide the cart panel.
  cartPanel.hidden = true;

});


// =========================
// 19. START THE APPLICATION
// =========================

// Load the products when the page starts.
getProducts();

// Show the initial empty-cart state.
updateCart();
