/* app.js - lógica do single-page organized site
   - Carrega lista de 6 bandas (editar dados abaixo)
   - Renderiza carrossel
   - Abre página da banda via hash #band/{id}
   - Formulário de submissão: abre o client-mail com os dados (estático)
*/

(() => {
  // === CONFIG / DADOS: substitua pelas suas bandas reais ===
  // Cada banda tem: id, name, thumb (imagem), photo (grande), bandRelease, projectRelease, video (link YouTube), support (apoia-se/catarse link)
  const BANDS = [
    {
      id: 'b1',
      name: 'Banda 1',
      thumb: '/assets/band1-thumb.jpg',
      photo: '/assets/band1.jpg',
      bandRelease: 'Breve histórico da Banda 1 — estilo, origem e trajetória.',
      projectRelease: 'Projeto: gravação do single e clipe caseiro. Objetivo: ampliar alcance e pagar deslocamento.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      support: 'https://catarse.me' // troque pelo link real
    },
    {
      id: 'b2',
      name: 'Banda 2',
      thumb: '/assets/band2-thumb.jpg',
      photo: '/assets/band2.jpg',
      bandRelease: 'Mini release da Banda 2 — influências e planos.',
      projectRelease: 'Projeto: pressing de vinil / gravação de demo pro circuito.',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      support: 'https://apoia.se'
    },
    // adicione até 6 objetos aqui...
  ];

  // === DOM references
  const carousel = document.getElementById('carousel');
  const arrowLeft = document.getElementById('arrow-left');
  const arrowRight = document.getElementById('arrow-right');
  const bandPage = document.getElementById('band-page');
  const home = document.getElementById('home');
  const bandPhoto = document.getElementById('band-photo');
  const bandName = document.getElementById('band-name');
  const bandReleaseEl = document.getElementById('band-release');
  const projectReleaseEl = document.getElementById('project-release');
  const bandVideo = document.getElementById('band-video');
  const supportBtn = document.getElementById('support-btn');
  const btnBack = document.getElementById('btn-back');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('submission-form');
  const btnClear = document.getElementById('btn-clear');

  // set year
  yearEl.textContent = new Date().getFullYear();

  // Helper: convert regular youtube url -> embed url
  function toEmbedUrl(url) {
    if (!url) return '';
    try {
      // if already embed
      if (url.includes('youtube.com/embed/')) return url;
      // get id from watch?v= or youtu.be
      const u = new URL(url);
      if (u.hostname.includes('youtu.be')) {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      if (u.searchParams && u.searchParams.get('v')) {
        return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
      }
      // fallback: return as-is
      return url;
    } catch (err) {
      return url;
    }
  }

  // Render carousel
  function renderCarousel() {
    carousel.innerHTML = '';
    BANDS.forEach(b => {
      const card = document.createElement('article');
      card.className = 'band-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `
        <img src="${b.thumb}" alt="${escapeHtml(b.name)}" />
        <h4>${escapeHtml(b.name)}</h4>
        <p class="small">${escapeHtml(trimText(b.bandRelease, 120))}</p>
        <button class="btn" data-id="${b.id}">Ver projeto</button>
      `;
      // click handlers
      card.querySelector('img').addEventListener('click', () => navigateToBand(b.id));
      card.querySelector('h4').addEventListener('click', () => navigateToBand(b.id));
      card.querySelector('button').addEventListener('click', () => navigateToBand(b.id));
      carousel.appendChild(card);
    });
  }

  // Navigation
  function navigateToBand(id) {
    location.hash = `#band/${id}`;
  }

  // Hash change handler
  function handleHash() {
    const hash = location.hash || '';
    if (!hash || hash === '#home' || hash === '#') {
      showHome();
      return;
    }
    if (hash.startsWith('#band/')) {
      const id = hash.split('/')[1];
      const band = BANDS.find(b => b.id === id);
      if (band) showBandPage(band);
      else showHome();
      return;
    }
    // fallback
    showHome();
  }

  function showHome() {
    bandPage.classList.add('hidden');
    home.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showBandPage(band) {
    home.classList.add('hidden');
    bandPage.classList.remove('hidden');

    bandPhoto.src = band.photo;
    bandPhoto.alt = band.name + ' • Foto';
    bandName.textContent = band.name;
    bandReleaseEl.textContent = band.bandRelease;
    projectReleaseEl.textContent = band.projectRelease;
    bandVideo.src = toEmbedUrl(band.video);
    supportBtn.href = band.support || '#';

    // scroll to top of band page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Arrows scroll
  arrowLeft.addEventListener('click', () => {
    carousel.scrollBy({ left: -340, behavior: 'smooth' });
  });
  arrowRight.addEventListener('click', () => {
    carousel.scrollBy({ left: 340, behavior: 'smooth' });
  });

  // Back button
  btnBack.addEventListener('click', () => {
    location.hash = '#home';
    bandVideo.src = ''; // stop video
  });

  // Form: since GitHub Pages é estático, vamos montar mailto com os dados
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const band = document.getElementById('s-band').value.trim();
    const title = document.getElementById('s-title').value.trim();
    const video = document.getElementById('s-video').value.trim();
    const pdf = document.getElementById('s-pdf').value.trim();
    const photo = document.getElementById('s-photo').value.trim();
    const summary = document.getElementById('s-summary').value.trim();

    if (!band || !title || !video || !pdf || !summary) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    // Compose mailto
    const email = 'seu-email@exemplo.com'; // ALTERE para o seu e-mail de curadoria
    const subject = encodeURIComponent(`Inscrição - Palco Coletivo: ${band} — ${title}`);
    const bodyLines = [
      `Banda: ${band}`,
      `Projeto: ${title}`,
      `Vídeo: ${video}`,
      `PDF do release: ${pdf}`,
      `Foto: ${photo}`,
      `Resumo: ${summary}`,
      '',
      '---- Enviado via site Selo Palco Coletivo ----'
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    // open mail client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  btnClear.addEventListener('click', () => {
    form.reset();
  });

  // small helpers
  function trimText(txt, n) {
    if (!txt) return '';
    return txt.length > n ? txt.slice(0, n - 1) + '…' : txt;
  }
  function escapeHtml(s) {
    return (s + '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  // keyboard navigation for carousel (left/right arrows)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') carousel.scrollBy({ left: -320, behavior: 'smooth' });
    if (e.key === 'ArrowRight') carousel.scrollBy({ left: 320, behavior: 'smooth' });
    if (e.key === 'Escape') location.hash = '#home';
  });

  // Init
  function init() {
    renderCarousel();
    window.addEventListener('hashchange', handleHash);
    handleHash(); // initial
  }

  init();
})();
