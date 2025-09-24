// CARROSSEL
const track = document.querySelector('.carousel-track');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;

if (track) {
  next.addEventListener('click', () => {
    if (index < track.children.length - 1) {
      index++;
      updateCarousel();
    }
  });

  prev.addEventListener('click', () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  function updateCarousel() {
    const cardWidth = track.children[0].offsetWidth + 20;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  // CLICAR EM UMA BANDA → IR PARA PÁGINA DETALHE
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-banda');
      window.location.href = `banda.html?id=${id}`;
    });
  });
}

// BOTÃO VOLTAR AO TOPO
const btnTopo = document.getElementById('btn-topo');

if (btnTopo) {
  // Mostrar/esconder botão ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnTopo.style.display = 'block';
    } else {
      btnTopo.style.display = 'none';
    }
  });

  // Ação de voltar ao topo
  btnTopo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
