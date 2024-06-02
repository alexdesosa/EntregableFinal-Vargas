document.addEventListener("DOMContentLoaded", () => {
  const buttonMasculino = document.getElementById("button-m");
  const buttonFemenino = document.getElementById("button-f");
  const seleccionPersonaje = document.querySelectorAll(".seleccion-personaje");
  const mainContent = document.getElementById("main-content");
  let elegirSexo = "";

  buttonMasculino.addEventListener("click", () => {
    elegirSexo = "masculino";
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

  function pedirNombre() {
    mainContent.innerHTML = `
        <form id = "nombreForm">
            <label for = "nombre"> Introduce el nombre de tu personaje </label>
            <input type = "text" id = "nombre" required>
            <button type = "submit">Enviar</button> 
        </form>
        `;
    document
      .getElementById("nombreForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        Swal.fire({
          icon: "success",
          title: `¡Hola ${nombre}! Has seleccionado un personaje ${elegirSexo}.`,
        }).then(() => {
          mercado();
        });
      });
  }

  function mercado() {
    let ventaArmamento = [];
    mainContent.innerHTML = `
    <section id = "products-container">

    </section>
    `

    class Armamento {
      constructor(nombre, precio, equipamiento) {
        this.nombre = nombre;
        this.precio = precio;
        this.equipamiento = equipamiento;
      }
    }

    const armamentoDragonico = new Armamento("Armadura Dragonica", 250, "Armadura");
    const espadaLegendaria = new Armamento("Espada Legendaria", 150, "Arma");
    const arcoElfico = new Armamento("Arco Élfico", 120, "Arma");
    const escudoTitanico = new Armamento("Escudo Titánico", 200, "Escudo");
    const cascoVikingo = new Armamento("Casco Vikingo", 100, "Casco");
    const botasAladas = new Armamento("Botas Aladas", 180, "Botas");
    const lanzaDivina = new Armamento("Lanza Divina", 220, "Arma");
    const hachaDeBatalla = new Armamento("Hacha de Batalla", 170, "Arma");
    const bastonMágico = new Armamento("Bastón Mágico", 190, "Arma");
    const guantesDeFuego = new Armamento("Guantes de Fuego", 140, "Guantes");
    const capaInvisibilidad = new Armamento("Capa de Invisibilidad", 300, "Capa");

    ventaArmamento.push(armamentoDragonico,
        espadaLegendaria,
        arcoElfico,
        escudoTitanico,
        cascoVikingo,
        botasAladas,
        lanzaDivina,
        hachaDeBatalla,
        bastonMágico,
        guantesDeFuego,
        capaInvisibilidad
    );

    let datos = JSON.stringify(ventaArmamento);

    localStorage.setItem('ventaArmamento',datos);
    }
});
