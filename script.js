

// === PARALLAX SOBRE LA IMAGEN ===
const imagen = document.querySelector('.imagen-mapa');

if (imagen) {
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = 0.5 - e.clientX / innerWidth;
    const offsetY = 0.5 - e.clientY / innerHeight;
    const moveX = offsetX * 20;
    const moveY = offsetY * 20;
    imagen.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  document.addEventListener('mouseleave', () => {
    imagen.style.transform = 'translate(0, 0)';
  });
}

// === BOTÓN "INGRESAR" DESDE INDEX ===
const boton = document.getElementById('ingresarBtn');
if (boton) {
  boton.addEventListener('click', (e) => {
    e.preventDefault(); // evita que cambie de página altiro
    const rect = boton.getBoundingClientRect(); // posición del botón en pantalla
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // origen del zoom = el botón
    document.body.style.transformOrigin = `${x}px ${y}px`;
    document.body.classList.add('zoom-dirigido');

    // espera 600 ms y luego cambia la página
    setTimeout(() => {
      window.location.href = "mapaglobal.html";
    }, 600);
  });
}


// === BOTÓN "VOLVER" DINÁMICO ===
const volver = document.getElementById('volverBtn');
if (volver) {
  const destino = volver.dataset.volver || "index.html";
  volver.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('animar-zoom-out');
    setTimeout(() => {
      window.location.href = destino;
    }, 600);
  });
}



// === REDIRECCIONES A OTRAS VISTAS (solo si NO hay ficha) ===
const redirecciones = {
  
  'punto-puerto': 'puertopresente.html',
  'punto-perturbacion': 'perturbacionaerea.html',
  'punto-choapa': 'provinciachoapa.html',
  'punto-jilguero': 'jilguero.html',
  'punto-jote': 'jote.html',
  'punto-bosques': 'eucalipto.html',
  'punto-luminaria': 'luminaria.html',
  'punto-cables':'electricidad.html',
  'punto-diuca':'diuca.html',
};

Object.entries(redirecciones).forEach(([id, url]) => {
 
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.addEventListener('click', (e) => {
        e.preventDefault();
        const rect = elemento.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        document.body.style.transformOrigin = `${x}px ${y}px`;
        document.body.classList.add('zoom-dirigido');

        setTimeout(() => {
          window.location.href = url;
        }, 600);
      });
    }
  
});

// === PARALLAX TAMBIÉN PARA LOS PUNTOS ===
const puntos = document.querySelectorAll('.punto, .icono-paisaje, .paisaje-parallax');

document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const offsetX = 0.5 - e.clientX / innerWidth;
  const offsetY = 0.5 - e.clientY / innerHeight;
  const moveX = offsetX * 20;
  const moveY = offsetY * 20;

  if (imagen) {
    imagen.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  puntos.forEach(p => {
    const puntoOffsetX = offsetX * 10; // movimiento más leve que la imagen
    const puntoOffsetY = offsetY * 10;
    p.style.transform = `translate(calc(-50% + ${puntoOffsetX}px), calc(-50% + ${puntoOffsetY}px))`;
  });
});

document.addEventListener('mouseleave', () => {
  if (imagen) imagen.style.transform = 'translate(0, 0)';
  puntos.forEach(p => {
    p.style.transform = 'translate(-50%, -50%)';
  });
});

document.querySelectorAll('.breadcrumb-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const url = link.getAttribute('href');

    // Zoom-out desde el centro de la pantalla
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    document.body.style.transformOrigin = `${x}px ${y}px`;
    document.body.classList.add('animar-zoom-out');

    setTimeout(() => {
      window.location.href = url;
    }, 600);
  });
});


document.querySelectorAll('.filtro-btn').forEach(btn => {
  const tipo = btn.dataset.tipo;

  btn.addEventListener('mouseenter', () => {
    document.querySelectorAll(`.${tipo}`).forEach(elem => {
      elem.classList.add('mostrar-leyenda');
    });
  });

  btn.addEventListener('mouseleave', () => {
    document.querySelectorAll(`.${tipo}`).forEach(elem => {
      elem.classList.remove('mostrar-leyenda');
    });
  });
});

const descripcion = document.getElementById("descripcionPaisaje");
const titulo = document.getElementById("tituloPaisaje");
const texto = document.getElementById("textoPaisaje");

const descripciones = {
  "punto-biótico": {
    titulo: "Paisajes Bióticos",
    texto: "Representan elementos vivos como flora, fauna y ecosistemas naturales."
  },
  "punto-antrópico": {
    titulo: "Paisajes Antrópicos",
    texto: "Muestran infraestructuras humanas e intervenciones sobre el territorio."
  },
  "punto-físico": {
    titulo: "Paisajes Físicos",
    texto: "Refieren a elementos geográficos y características naturales del terreno."
  }
};

const contenido = document.getElementById("contenidoDescripcion");

document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    const id = btn.id;
    if (descripciones[id]) {
      contenido.style.opacity = 0;

      setTimeout(() => {
        titulo.textContent = descripciones[id].titulo;
        texto.textContent = descripciones[id].texto;
        descripcion.classList.add("visible");
        contenido.style.opacity = 1;
      }, 150);
    }
  });

  btn.addEventListener("mouseleave", () => {
    descripcion.classList.remove("visible");
    titulo.textContent = "";
    texto.textContent = "";
    contenido.style.opacity = 0;
  });
});