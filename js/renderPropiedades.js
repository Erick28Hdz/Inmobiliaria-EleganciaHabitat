// renderPropiedades.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-propiedades");
  const botones = document.querySelectorAll(".botones-filtro button");
  const btnAlquiler = document.getElementById("btn-alquiler");
  const btnVenta = document.getElementById("btn-venta");
  const tituloTipo = document.getElementById("titulo-tipo");
  const btnNuevo = document.querySelector(".btn-nuevo"); // <- puede ser null si no existe aún

  let tipoActivo = "alquiler";
  let categoriaActiva = "elegante";

  // 👇 Función que muestra/oculta el botón 'Nuevo' solo en modo "venta"
  function toggleNuevoBtn() {
    if (btnNuevo) {
      btnNuevo.style.display = tipoActivo === "venta" ? "inline-block" : "none";
    }
  }

  function obtenerDatos() {
    return tipoActivo === "alquiler" ? propiedadesAlquiler : propiedadesVenta;
  }

  function seleccionarCategoriaPorDefecto() {
    if (tipoActivo === "alquiler") {
      categoriaActiva = "elegante";
    } else {
      categoriaActiva = "nuevo";
    }

    // Actualizar botones activos
    botones.forEach(b => {
      b.classList.toggle("activo", b.dataset.categoria === categoriaActiva);
    });

    // Actualizar título de la sección
    const tipoTexto = tipoActivo === "alquiler" ? "Alquilar" : "Comprar";
    const categoriaTexto = document.querySelector(`.botones-filtro button[data-categoria="${categoriaActiva}"]`).textContent;
    tituloTipo.textContent = `${tipoTexto} · ${categoriaTexto}`;
  }

  function renderizarPropiedades() {
    contenedor.innerHTML = "";

    const filtradas = obtenerDatos().filter(
      (p) => p.categoria === categoriaActiva
    );

    filtradas.forEach((p) => {
      const div = document.createElement("div");
      div.classList.add("card-propiedad");
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.titulo}">
        <h5 class="titulo-propiedad-card">${p.titulo}</h5>
        <p class="descripcion-propiedad">${p.descripcion}</p>
        <p class="direccion-propiedad"><i class="fas fa-map-marker-alt"></i> ${p.direccion}</p>
        <p class="precio-propiedad"><strong>${p.precio}</strong></p>
      `;
      contenedor.appendChild(div);
    });

    // ✅ Texto marketing actualizado
    const textoMarketing = textosMarketing[categoriaActiva];
    const textoMarketingElemento = document.getElementById("texto-marketing");
    if (textoMarketingElemento) {
      textoMarketingElemento.textContent = textoMarketing || "";
    }
  }

  // 🎯 Escuchar clic en los botones de categoría
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoriaActiva = btn.dataset.categoria;

      botones.forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");

      const tipoTexto = tipoActivo === "alquiler" ? "Alquilar" : "Comprar";
      const categoriaTexto = btn.textContent;
      tituloTipo.textContent = `${tipoTexto} · ${categoriaTexto}`;

      renderizarPropiedades();
    });
  });

  // ✨ Textos para cada categoría
  const textosMarketing = {
    elegante: "Descubre propiedades con un diseño sofisticado y acabados de lujo. Vive con distinción.",
    invierno: "Viviendas ideales para climas fríos, con chimeneas, aislamiento térmico y confort total.",
    verano: "Propiedades frescas, iluminadas y cercanas a espacios verdes o piscinas. Ideal para el sol.",
    montaña: "Hogares rodeados de naturaleza, paz y vistas espectaculares en la cima.",
    clasico: "Arquitectura tradicional con toques modernos. Casas que nunca pasan de moda.",
    nuevo: "Conoce nuestros proyectos de obra nueva: diseño vanguardista, eficiencia energética y plusvalía garantizada."
  };

  // 🔁 Eventos para cambiar de tipo
  btnAlquiler.addEventListener("click", () => {
    tipoActivo = "alquiler";
    seleccionarCategoriaPorDefecto();   // ← establece categoría y título
    toggleNuevoBtn();
    renderizarPropiedades();
  });

  btnVenta.addEventListener("click", () => {
    tipoActivo = "venta";
    seleccionarCategoriaPorDefecto();   // ← establece categoría y título
    toggleNuevoBtn();
    renderizarPropiedades();
  });

  // 🚀 Enlaces de navegación (scroll y cambio de tipo)
  document.querySelector('a[href="#alquiler"]').addEventListener("click", (e) => {
    e.preventDefault();
    tipoActivo = "alquiler";
    seleccionarCategoriaPorDefecto();   // ← establece categoría y título
    toggleNuevoBtn();
    renderizarPropiedades();
    document.getElementById("contenedor-propiedades").scrollIntoView({ behavior: "smooth" });
  });

  document.querySelector('a[href="#venta"]').addEventListener("click", (e) => {
    e.preventDefault();
    tipoActivo = "venta";
    seleccionarCategoriaPorDefecto();   // ← establece categoría y título
    toggleNuevoBtn();
    renderizarPropiedades();
    document.getElementById("contenedor-propiedades").scrollIntoView({ behavior: "smooth" });
  });

  // ⬅️➡️ Carrusel de tarjetas
  const flechaIzquierda = document.querySelector(".flecha.izquierda");
  const flechaDerecha = document.querySelector(".flecha.derecha");

  flechaIzquierda?.addEventListener("click", () => {
    contenedor.scrollBy({ left: -320, behavior: "smooth" });
  });

  flechaDerecha?.addEventListener("click", () => {
    contenedor.scrollBy({ left: 320, behavior: "smooth" });
  });

  seleccionarCategoriaPorDefecto();
  toggleNuevoBtn(); // Mostrar/ocultar botón 'nuevo' al cargar
  renderizarPropiedades(); // Mostrar propiedades iniciales
});



