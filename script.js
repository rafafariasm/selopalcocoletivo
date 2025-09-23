// CARROSSEL
const track = document.querySelector('.carousel-track');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;

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
