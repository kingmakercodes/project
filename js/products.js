let cart = JSON.parse(localStorage.getItem('cart')) || [];
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-item-count');

// Function to fetch products from the JSON file and dynamically add them to the product list
async function addProducts() {
    const response = await fetch('../data/products.json');
    const products = await response.json();

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button class="btn add-to-cart" aria-label="Add ${product.name} to Cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to cart</button>
        `;
        productList.appendChild(productItem);
    });

    // Add event listeners to the buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    updateCartCount(); // Update cart count on initial load
}

// Function to add products to the cart
function addToCart(event) {
    const name = event.target.getAttribute('data-name');
    const price = event.target.getAttribute('data-price');
    const image = event.target.getAttribute('data-image');

    const cartItem = { name, price, image };
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in local storage
    updateCartCount(); // Update cart count after adding an item
}

// Function to update the cart count display
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cartItems.length; // Update the cart count from local storage
}

// Call the function to add products on page load
document.addEventListener('DOMContentLoaded', addProducts); 