document.addEventListener("DOMContentLoaded", () => {
  const buttonMasculino = document.getElementById("button-m");
  const buttonFemenino = document.getElementById("button-f");
  const mainContent = document.getElementById("main-content");
  let elegirSexo = localStorage.getItem("elegirSexo") || "";

  buttonMasculino.addEventListener("click", () => {
    elegirSexo = "masculino";
    localStorage.setItem("elegirSexo", elegirSexo);
    buttonMasculino.classList.add("seleccionado");
    buttonFemenino.classList.remove("seleccionado");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "¡Has seleccionado un personaje masculino!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      pedirNombre();
    });
  });

  buttonFemenino.addEventListener("click", () => {
    elegirSexo = "femenino";
    localStorage.setItem("elegirSexo", elegirSexo);
    buttonFemenino.classList.add("seleccionado");
    buttonMasculino.classList.remove("seleccionado");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "¡Has seleccionado un personaje femenino!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      pedirNombre();
    });
  });

  if (elegirSexo) {
    pedirNombre();
  }

  function pedirNombre() {
    const nombre = localStorage.getItem("nombrePersonaje");
    if (nombre) {
      Swal.fire({
        icon: "success",
        title: `¡Hola ${nombre}! Has seleccionado un personaje ${elegirSexo}.`,
      }).then(() => {
        mercado();
      });
    } else {
      mainContent.innerHTML = `
        <form id="nombreForm">
            <label for="nombre">Introduce el nombre de tu personaje</label>
            <input type="text" id="nombre" required>
            <button type="submit">Enviar</button>
        </form>
      `;
      document
        .getElementById("nombreForm")
        .addEventListener("submit", (event) => {
          event.preventDefault();
          const nombre = document.getElementById("nombre").value;
          localStorage.setItem("nombrePersonaje", nombre);
          Swal.fire({
            icon: "success",
            title: `¡Hola ${nombre}! Has seleccionado un personaje ${elegirSexo}.`,
          }).then(() => {
            mercado();
          });
        });
    }
  }

  function mercado() {
    mainContent.innerHTML = `
      <section id="products-container"></section>
    `;

    let productosContainer = document.getElementById('products-container');
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    fetch("db/data.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(producto => {
          const cart = document.createElement('div');
          cart.classList.add('producto'); // Agregar la clase producto
          cart.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="./assets/img/${producto.nombre.toLowerCase().replace(/\s+/g, '-')}.jpg" alt="${producto.nombre}">
            <p>$ ${producto.precio}</p>
            <p>${producto.equipamiento}</p>
            <button class="productoAgregar" id=${producto.id}>Agregar</button>
          `;
          productosContainer.appendChild(cart);
        });
        addToCartButton(data);
      })
      .catch(error => console.error('Error:', error));
  }

  function addToCartButton(productos) {
    let addButton = document.querySelectorAll('.productoAgregar');
    addButton.forEach(button => {
      button.onclick = (e) => {
        const productId = e.currentTarget.id;
        const selectedProduct = productos.find(producto => producto.id == productId);
        let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        cartProducts.push(selectedProduct);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      }
    });
  }
});
