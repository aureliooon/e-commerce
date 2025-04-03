// Example: Basic e-commerce functionality

// Add to cart functionality
const cart = [];

function addToCart(productId, productName, productPrice) {
    const product = { id: productId, name: productName, price: productPrice, quantity: 1 };
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCartUI();
}

// Remove from cart functionality
function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }

    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = `Total: $${totalPrice}`;
}

// Example usage (adjust based on your HTML structure)
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.id;
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);

        addToCart(productId, productName, productPrice);
    });
});

// Swiper functionality
const product = document.querySelector('.product');

let isDragging = false;
let startX;
let scrollLeft;

product.addEventListener('mousedown', (e) => {
  isDragging = true;
  product.classList.add('active'); // Tambahkan class untuk efek kursor
  startX = e.pageX - product.offsetLeft;
  scrollLeft = product.scrollLeft;
});

product.addEventListener('mouseleave', () => {
  isDragging = false;
  product.classList.remove('active');
});

product.addEventListener('mouseup', () => {
  isDragging = false;
  product.classList.remove('active');
});

product.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // Hentikan jika tidak sedang dragging
  e.preventDefault();
  const x = e.pageX - product.offsetLeft;
  const walk = (x - startX) * 2; // Kecepatan scroll (sesuaikan nilai)
  product.scrollLeft = scrollLeft - walk;
});

const productList = document.querySelector('.product-list');

productList.addEventListener('mousedown', (e) => {
  console.log('Mouse down');
  isDragging = true;
  productList.classList.add('active'); // Tambahkan class untuk efek kursor
  startX = e.pageX - productList.offsetLeft;
  scrollLeft = productList.scrollLeft;
});

productList.addEventListener('mouseleave', () => {
  isDragging = false;
  productList.classList.remove('active');
});

productList.addEventListener('mouseup', () => {
  isDragging = false;
  productList.classList.remove('active');
});

productList.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // Hentikan jika tidak sedang dragging
  e.preventDefault();
  const x = e.pageX - productList.offsetLeft;
  const walk = (x - startX) * 2; // Kecepatan scroll (sesuaikan nilai)
  productList.scrollLeft = scrollLeft - walk;
});

document.querySelectorAll('.product img').forEach((img) => {
  img.style.pointerEvents = 'none';
});