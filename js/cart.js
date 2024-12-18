// Function to load cart items from local storage and display them
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceDisplay = document.getElementById('total-price');

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>'; // Display message if cart is empty
        totalPriceDisplay.textContent = '$0.00'; // Reset total price
        updateCartCount(); // Update cart count
        return; // Exit the function
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item-container'); // Add a class for styling
        itemElement.innerHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="cart-item-details">
                    <h3 class="product-name">${item.name}</h3>
                    <p class="product-price">${item.price}</p>
                    <button class="btn remove-from-cart" aria-label="Remove ${item.name} from Cart" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += parseFloat(item.price.replace('$', '').replace(',', '')); // Handle commas in price
    });

    totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;

    // Update cart count in the header
    updateCartCount();

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Function to update the cart count display
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-item-count'); // Get the cart count element
    cartCount.textContent = cartItems.length; // Update the cart count from local storage
}

// Function to add an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item); // Add the new item to the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    updateCartCount(); // Update cart count after adding an item
}

// Function to remove an item from the cart
function removeFromCart(event) {
    const index = event.target.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    loadCart(); // Reload cart items
}

// Load cart items on page load
document.addEventListener('DOMContentLoaded', loadCart);