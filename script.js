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

// MODAL BANDAS
const modal = document.getElementById('bandaModal');
const bandaContent = document.getElementById('bandaContent');
const closeBtn = document.querySelector('.close');

const bandas = {
  1: {
    nome: "Slipknot",
    imagem: "img/slipknot.jpg",
    releaseBanda: "Slipknot é uma banda lendária do metal mundial...",
    releaseProjeto: "Este projeto busca apoiar a produção de um novo single pesado.",
    video: "https://www.youtube.com/embed/6fVE8kSM43I",
    apoio: "#"
  },
  2: {
    nome: "Madbong",
    imagem: "img/banda2.jpg",
    releaseBanda: "Madbong é uma banda independente que mistura estilos...",
    releaseProjeto: "O projeto visa financiar uma pequena tour pelo nordeste.",
    video: "https://www.youtube.com/embed/ScNNfyq3d_w",
    apoio: "#"
  },
  3: {
    nome: "Banda 3",
    imagem: "img/banda3.jpg",
    releaseBanda: "Descrição da Banda 3...",
    releaseProjeto: "Descrição do projeto da Banda 3...",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    apoio: "#"
  },
  4: {
    nome: "Banda 4",
    imagem: "img/banda4.jpg",
    releaseBanda: "Descrição da Banda 4...",
    releaseProjeto: "Descrição do projeto da Banda 4...",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    apoio: "#"
  },
  5: {
    nome: "Banda 5",
    imagem: "img/banda5.jpg",
    releaseBanda: "Descrição da Banda 5...",
    releaseProjeto: "Descrição do projeto da Banda 5...",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    apoio: "#"
  },
  6: {
    nome: "Banda 6",
    imagem: "img/banda6.jpg",
    releaseBanda: "Descrição da Banda 6...",
    releaseProjeto: "Descrição do projeto da Banda 6...",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    apoio: "#"
  }
};

// Abrir modal ao clicar na banda
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-banda');
    const banda = bandas[id];

    bandaContent.innerHTML = `
      <h2>${banda.nome}</h2>
      <img src="${banda.imagem}" alt="${banda.nome}">
      <p><strong>Release da Banda:</strong> ${banda.releaseBanda}</p>
      <p><strong>Release do Projeto:</strong> ${banda.releaseProjeto}</p>
      <iframe src="${banda.video}" frameborder="0" allowfullscreen></iframe>
      <a href="${banda.apoio}" target="_blank" class="btn">Apoiar</a>
    `;
    modal.style.display = "block";
  });
});

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
});

// Fechar clicando fora
window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
