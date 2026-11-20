
(function () {
  function iniciar() {
    var slider = document.querySelector('.yema-reviews-slider');
    if (!slider || window.innerWidth > 768) return;

    var cards = Array.from(slider.querySelectorAll('.yema-review-card'));
    if (cards.length < 2 || slider.dataset.yemaAuto) return;

    slider.dataset.yemaAuto = 'true';

    var indice = 0;
    var pausaHasta = 0;

    function actualizarIndice() {
      var izquierda = slider.getBoundingClientRect().left +
        (parseFloat(getComputedStyle(slider).paddingLeft) || 0);
      var menor = Infinity;

      cards.forEach(function (card, i) {
        var distancia = Math.abs(card.getBoundingClientRect().left - izquierda);
        if (distancia < menor) {
          menor = distancia;
          indice = i;
        }
      });
    }

    function avanzar() {
      actualizarIndice();
      indice = (indice + 1) % cards.length;

      var destino = slider.scrollLeft +
        cards[indice].getBoundingClientRect().left -
        slider.getBoundingClientRect().left -
        (parseFloat(getComputedStyle(slider).paddingLeft) || 0);

      slider.scrollTo({ left: destino, behavior: 'smooth' });
    }

    ['touchstart', 'pointerdown', 'wheel'].forEach(function (evento) {
      slider.addEventListener(evento, function () {
        pausaHasta = Date.now() + 10000;
      }, { passive: true });
    });

    slider.addEventListener('scroll', actualizarIndice, { passive: true });

    setInterval(function () {
      if (document.hidden || Date.now() < pausaHasta) return;
      avanzar();
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
