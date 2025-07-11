document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");

  const imagenes = [
    "images/portadas/portada1.jpg",
    "images/portadas/portada2.jpg",
    "images/portadas/portada3.jpg",
    "images/portadas/portada4.jpg"
  ];

  let indice = 0;

  function cambiarFondo() {
    banner.style.backgroundImage = `url(${imagenes[indice]})`;
    indice = (indice + 1) % imagenes.length;
  }

  cambiarFondo(); // inicial
  setInterval(cambiarFondo, 5000); // cambia cada 5 segundos
});
