// Dados de exemplo das bandas
const bandasData = [
    {
        id: 1,
        nome: "Banda 1",
        descricao: "Projeto para gravação de single e videoclipe",
        imagem: "img/banda1.jpg",
        meta: 600,
        arrecadado: 350
    },
    {
        id: 2,
        nome: "Banda 2",
        descricao: "Combustível para mini-tour no interior",
        imagem: "img/banda2.jpg",
        meta: 600,
        arrecadado: 420
    },
    {
        id: 3,
        nome: "Banda 3",
        descricao: "Produção de merchandising para shows",
        imagem: "img/banda3.jpg",
        meta: 600,
        arrecadado: 180
    },
    {
        id: 4,
        nome: "Banda 4",
        descricao: "Gravação de EP com 5 faixas",
        imagem: "img/banda4.jpg",
        meta: 600,
        arrecadado: 510
    },
    {
        id: 5,
        nome: "Banda 5",
        descricao: "Impressão de CDs para distribuição",
        imagem: "img/banda5.jpg",
        meta: 600,
        arrecadado: 290
    },
    {
        id: 6,
        nome: "Banda 6",
        descricao: "Produção de arte para novo álbum",
        imagem: "img/banda6.jpg",
        meta: 600,
        arrecadado: 400
    }
];

// Inicializar o carrossel de bandas
document.addEventListener('DOMContentLoaded', function() {
    // Preencher o carrossel com as bandas
    const swiperWrapper = document.querySelector('.bandasSwiper .swiper-wrapper');
    
    if (swiperWrapper) {
        bandasData.forEach(banda => {
            const porcentagem = Math.round((banda.arrecadado / banda.meta) * 100);
            
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="banda-card">
                    <div class="banda-img">
                        <img src="${banda.imagem}" alt="${banda.nome}" onerror="this.src='img/placeholder.svg'">
                    </div>
                    <div class="banda-info">
                        <h3>${banda.nome}</h3>
                        <p>${banda.descricao}</p>
                        <div class="progresso-container">
                            <div class="progresso-barra">
                                <div class="progresso-preenchido" style="width: ${porcentagem}%"></div>
                            </div>
                            <div class="progresso-info">
                                <span>R$ ${banda.arrecadado},00 de R$ ${banda.meta},00</span>
                                <span>${porcentagem}%</span>
                            </div>
                        </div>
                        <a href="banda.html?id=${banda.id}" class="btn">Ver Detalhes</a>
                    </div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
    }
    
    // Inicializar o Swiper
    const swiper = new Swiper('.bandasSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
});

// Função para carregar os detalhes da banda na página individual
function carregarDetalhesBanda() {
    const urlParams = new URLSearchParams(window.location.search);
    const bandaId = parseInt(urlParams.get('id'));
    
    if (!bandaId) return;
    
    const banda = bandasData.find(b => b.id === bandaId);
    if (!banda) return;
    
    document.title = `${banda.nome} - Selo Palco Coletivo`;
    
    const bandaNome = document.getElementById('banda-nome');
    const bandaDescricao = document.getElementById('banda-descricao');
    const bandaImagem = document.getElementById('banda-imagem');
    const bandaArrecadado = document.getElementById('banda-arrecadado');
    const bandaMeta = document.getElementById('banda-meta');
    const bandaPorcentagem = document.getElementById('banda-porcentagem');
    const progressoPreenchido = document.getElementById('progresso-preenchido');
    
    if (bandaNome) bandaNome.textContent = banda.nome;
    if (bandaDescricao) bandaDescricao.textContent = banda.descricao;
    if (bandaImagem) {
        bandaImagem.src = banda.imagem;
        bandaImagem.alt = banda.nome;
        bandaImagem.onerror = function() {
            this.src = 'img/placeholder.svg';
        };
    }
    
    const porcentagem = Math.round((banda.arrecadado / banda.meta) * 100);
    
    if (bandaArrecadado) bandaArrecadado.textContent = `R$ ${banda.arrecadado},00`;
    if (bandaMeta) bandaMeta.textContent = `R$ ${banda.meta},00`;
    if (bandaPorcentagem) bandaPorcentagem.textContent = `${porcentagem}%`;
    if (progressoPreenchido) progressoPreenchido.style.width = `${porcentagem}%`;
}

// Verificar se estamos na página de detalhes da banda
if (window.location.pathname.includes('banda.html')) {
    document.addEventListener('DOMContentLoaded', carregarDetalhesBanda);
}
