document.addEventListener("DOMContentLoaded", () => {
  const casas = document.querySelectorAll('.alquiler > div');
  const casasPorPagina = 2;
  let paginaActual = 1;

  function mostrarPagina(pagina) {
    casas.forEach((casa, index) => {
      const inicio = (pagina - 1) * casasPorPagina;
      const fin = pagina * casasPorPagina;
      casa.style.display = index >= inicio && index < fin ? "block" : "none";
    });
  }

  function crearPaginacion() {
    const totalPaginas = Math.ceil(casas.length / casasPorPagina);
    const paginacion = document.getElementById('pagination');
    paginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.onclick = () => {
        paginaActual = i;
        mostrarPagina(paginaActual);
      };
      paginacion.appendChild(btn);
    }
  }

  mostrarPagina(paginaActual);
  crearPaginacion();
});
