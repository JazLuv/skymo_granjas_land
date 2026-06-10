/* ==========================================================================
   SKYMO HELADOS — Interacciones
   Sin librerías: IntersectionObserver para scroll-reveal y header sticky.
   Todo respeta prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     1. Año dinámico en el footer
     ---------------------------------------------------------------------- */
  const anio = document.getElementById("anioActual");
  if (anio) anio.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------------------
     2. Header sticky: transparente arriba, morado sólido al hacer scroll.
        Usamos un centinela invisible en la parte superior de la página:
        cuando deja de verse, activamos el estado sólido.
     ---------------------------------------------------------------------- */
  const header = document.getElementById("header");
  const centinela = document.getElementById("centinela-top");

  if (header && centinela) {
    new IntersectionObserver(function (entradas) {
      header.classList.toggle("header--solido", !entradas[0].isIntersecting);
    }).observe(centinela);
  }

  /* ----------------------------------------------------------------------
     3. Menú móvil (hamburguesa)
     ---------------------------------------------------------------------- */
  const botonMenu = document.getElementById("botonMenu");
  const menu = document.getElementById("menuPrincipal");

  if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {
      const abierto = menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", String(abierto));
      botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });

    // Cierra el menú al elegir una sección
    menu.querySelectorAll("a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        menu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------------------
     4. Scroll-reveal: los elementos .reveal aparecen al entrar en pantalla
     ---------------------------------------------------------------------- */
  const elementosReveal = document.querySelectorAll(".reveal");

  if (prefiereMenosMovimiento) {
    // Sin animación: todo visible de inmediato
    elementosReveal.forEach(function (el) { el.classList.add("visible"); });
  } else {
    const observadorReveal = new IntersectionObserver(function (entradas, observador) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target); // solo anima una vez
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });

    elementosReveal.forEach(function (el) { observadorReveal.observe(el); });
  }

  /* ----------------------------------------------------------------------
     5. Badge de horario: "¡Abierto ahora!" si estamos entre 12 pm y 9 pm.
        La tienda abre todos los días, así que solo revisamos la hora.
     ---------------------------------------------------------------------- */
  const badge = document.getElementById("badgeAbierto");

  if (badge) {
    const hora = new Date().getHours();
    if (hora >= 12 && hora < 21) {
      badge.textContent = "¡Abierto ahora!";
    } else {
      badge.textContent = "Hoy abrimos 12 pm";
      badge.classList.add("tarjeta-horario__badge--cerrado");
    }
  }

  /* ----------------------------------------------------------------------
     6. Carrusel de la galería: avanza solo, lento, y se pausa con el
        mouse encima, al tocarlo o al recibir el foco del teclado.
     ---------------------------------------------------------------------- */
  const carrusel = document.getElementById("carrusel");
  const pista = document.getElementById("carruselPista");

  if (carrusel && pista && !prefiereMenosMovimiento) {
    let pausado = false;

    ["mouseenter", "pointerdown", "focusin", "touchstart"].forEach(function (evento) {
      carrusel.addEventListener(evento, function () { pausado = true; }, { passive: true });
    });

    ["mouseleave", "focusout"].forEach(function (evento) {
      carrusel.addEventListener(evento, function () { pausado = false; });
    });

    // Cada 3.5 s avanza al siguiente elemento; al final regresa al inicio
    setInterval(function () {
      if (pausado || document.hidden) return;

      const item = pista.querySelector(".carrusel__item");
      if (!item) return;

      const paso = item.offsetWidth + 20; // ancho del item + gap
      const final = carrusel.scrollWidth - carrusel.clientWidth - 10;

      if (carrusel.scrollLeft >= final) {
        carrusel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carrusel.scrollBy({ left: paso, behavior: "smooth" });
      }
    }, 3500);
  }
})();
