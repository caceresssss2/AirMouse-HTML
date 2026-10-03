// AirMouse — versión HTML simple, sin React/Vite

(function () {

  console.log("AIRMOUSE JS FUNCIONANDO");
  const root = document.documentElement;

  // =========================
  // TEMA
  // =========================

  const saved = localStorage.getItem('airmouse-theme');

  if (saved === 'light') {
    root.classList.add('light');
  }

  const themeButtons = document.querySelectorAll('[data-theme-toggle]');

  themeButtons.forEach(function (button) {

    updateThemeIcon(button);

    button.addEventListener('click', function () {

      root.classList.toggle('light');

      localStorage.setItem(
        'airmouse-theme',
        root.classList.contains('light') ? 'light' : 'dark'
      );

      themeButtons.forEach(updateThemeIcon);

    });

  });


  // =========================
  // MENÚ MOBILE
  // =========================

  const mobileButtons = document.querySelectorAll('[data-mobile-toggle]');

  mobileButtons.forEach(function (button) {

    button.addEventListener('click', function () {

      const menu = document.querySelector('[data-mobile-menu]');

      if (menu) {
        menu.hidden = !menu.hidden;
      }

    });

  });


  // =========================
  // CURSOR PERSONALIZADO
  // =========================

  const cursor = document.querySelector('.cursor-dot');

  const isDesktop = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  ).matches;

  if (cursor && isDesktop) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;


    // Detectar movimiento del mouse

    window.addEventListener('mousemove', function (event) {

      mouseX = event.clientX;
      mouseY = event.clientY;

    });


    // Movimiento suave del cursor

    function moveCursor() {

      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      requestAnimationFrame(moveCursor);

    }

    moveCursor();


    // =========================
    // HOVER
    // =========================

    const interactive = document.querySelectorAll(
      'a, button, input, textarea, select'
    );

    interactive.forEach(function (element) {

      element.addEventListener('mouseenter', function () {
        cursor.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', function () {
        cursor.classList.remove('cursor-hover');
      });

    });


    // =========================
// CLICK — EFECTO DEL CURSOR
// =========================

window.addEventListener('mousedown', function () {
  cursor.classList.add('cursor-click');
});

window.addEventListener('mouseup', function () {
  cursor.classList.remove('cursor-click');
});

window.addEventListener('blur', function () {
  cursor.classList.remove('cursor-click');
});

  }
// =========================
// ANIMACIONES DE ENTRADA
// =========================

const reveal = document.querySelectorAll('.reveal');

console.log("REVEAL ENCONTRADOS:", reveal.length);

if ('IntersectionObserver' in window) {

  const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.classList.add('is-visible');

console.log("ANIMANDO:", entry.target);

observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.15
  });

  reveal.forEach(function (element) {
    observer.observe(element);
  });

} else {

  reveal.forEach(function (element) {
    element.classList.add('is-visible');
  });

}
  // =========================
  // ICONO DEL TEMA
  // =========================

  function updateThemeIcon(button) {
 
    const light = root.classList.contains('light');

    button.textContent = light ? '☾' : '☀';

    button.setAttribute(
      'aria-label',
      light
        ? 'Cambiar a modo oscuro'
        : 'Cambiar a modo claro'
    );

  }


  // =========================
  // BOTÓN DE APOYO
  // =========================

  const support = document.querySelector('[data-support]');
  const confirmation = document.querySelector('[data-support-confirm]');

  if (support && confirmation) {

    support.addEventListener('click', function () {

      support.textContent = 'Intención registrada →';

      confirmation.hidden = false;

    });

  }

})();

