let cartStorage = localStorage.getItem('cartProducts');
cartStorage = JSON.parse(cartStorage) || [];

let cartContainer = document.getElementById('cart-section');

function renderCarrito(cartItems) {
  cartItems.forEach(producto => {
    const cart = document.createElement('div');
    cart.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="../assets/img/${producto.nombre.toLowerCase().replace(/\s+/g, '-')}.jpg" alt="${producto.nombre}">
      <p>$ ${producto.precio}</p>
      <p>${producto.equipamiento}</p>
      <button class="productoQuitar" id=${producto.id}>Quitar</button>
    `;
    cartContainer.appendChild(cart);
  });

  // Agregar botón de comprar al final del carrito
  const buyButton = document.createElement('button');
  buyButton.id = "buyButton";
  buyButton.textContent = "Comprar";
  cartContainer.appendChild(buyButton);

  buyButton.addEventListener('click', () => {
    if (cartItems.length > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: '¡Has comprado tus productos con éxito!',
      }).then(() => {
        // Limpiar el carrito después de la compra
        localStorage.removeItem('cartProducts');
        cartContainer.innerHTML = ''; // Limpiar el contenido del carrito en la página
        renderCarrito([]); // Vuelve a renderizar el carrito vacío
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Carrito vacío',
        text: 'No tienes productos en el carrito.',
      });
    }
  });

  // Añadir evento de quitar producto
  addRemoveFromCartButton(cartItems);
}

function addRemoveFromCartButton(cartItems) {
  let removeButton = document.querySelectorAll('.productoQuitar');
  removeButton.forEach(button => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id;
      cartItems = cartItems.filter(producto => producto.id != productId);
      localStorage.setItem("cartProducts", JSON.stringify(cartItems));
      cartContainer.innerHTML = ''; // Limpiar el contenido del carrito
      renderCarrito(cartItems); // Renderizar nuevamente el carrito
    }
  });
}

renderCarrito(cartStorage);
