// Dados de exemplo das bandas
const bandasData = [
    {
        id: 1,
        nome: "Banda 1",
        descricao: "Projeto para gravação de single e videoclipe",
        imagem: "img/banda1.svg",
        meta: 600,
        arrecadado: 350,
        projeto: "Precisamos gravar nosso novo single e produzir um videoclipe para divulgação nas redes sociais. Este projeto é fundamental para aumentar nossa visibilidade e alcançar novos fãs.",
        sobre: "Somos uma banda de rock alternativo formada em 2019. Nosso som mistura influências do rock clássico com elementos modernos, criando uma sonoridade única e envolvente.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        apoiarUrl: "https://www.catarse.me"
    },
    {
        id: 2,
        nome: "Banda 2",
        descricao: "Combustível para mini-tour no interior",
        imagem: "img/banda1.svg",
        meta: 600,
        arrecadado: 420,
        projeto: "Estamos organizando uma mini-tour por cinco cidades do interior e precisamos de apoio para cobrir os custos de combustível e deslocamento.",
        sobre: "Banda de hardcore melódico com letras que abordam questões sociais e políticas. Formada em 2018, já lançamos um EP e diversos singles independentes.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        apoiarUrl: "https://www.catarse.me"
    },
    {
        id: 3,
        nome: "Banda 3",
        descricao: "Produção de merchandising para shows",
        imagem: "img/banda1.svg",
        meta: 600,
        arrecadado: 180,
        projeto: "Queremos produzir camisetas e outros itens de merchandising para vender em nossos shows e aumentar nossa renda para investir em novos projetos.",
        sobre: "Trio de punk rock com influências do hardcore e do grunge. Conhecidos por shows energéticos e letras diretas e impactantes.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        apoiarUrl: "https://www.catarse.me"
    },
    {
        id: 4,
        nome: "Banda 4",
        descricao: "Gravação de EP com 5 faixas",
        imagem: "img/banda1.svg",
        meta: 600,
        arrecadado: 510,
        projeto: "Estamos finalizando a composição de nosso primeiro EP e precisamos de apoio para entrar em estúdio e gravar as cinco faixas que farão parte deste lançamento.",
        sobre: "Banda de indie rock formada em 2020. Nosso som é caracterizado por melodias cativantes e arranjos elaborados, com influências do rock dos anos 90 e 2000.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        apoiarUrl: "https://www.catarse.me"
    },
    {
        id: 5,
        nome: "Banda 5",
        descricao: "Impressão de CDs para distribuição",
        imagem: "img/banda1.svg",
        meta: 600,
        arrecadado: 290,
        projeto: "Já gravamos nosso álbum e agora precisamos produzir CDs físicos para distribuição em shows e para envio a rádios e veículos especializados.",
        sobre: "Quinteto de metal que mistura elementos do thrash, death e groove metal. Ativos na cena underground desde 2017, com um EP e um álbum lançados de forma independente.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        apoiarUrl: "https://www.catarse.me"
    },
    {
        id: 6,
        nome: "Banda 6",
        descricao: "Produção de arte para novo álbum",
        imagem: "img/banda1.svg",
        meta: 600,
        arrecadado: 400,
        projeto: "Estamos finalizando nosso novo álbum e precisamos contratar um artista para criar a capa e todo o material visual que acompanhará este lançamento.",
        sobre: "Banda de post-rock instrumental formada em 2016. Nossas composições exploram atmosferas e texturas sonoras, criando paisagens musicais imersivas e emocionantes.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        apoiarUrl: "https://www.catarse.me"
    }
];

// Função para mostrar a página principal ou a página da banda
function mostrarPagina(pagina) {
    if (pagina === 'pagina-principal') {
        document.getElementById('pagina-principal').style.display = 'block';
        document.getElementById('pagina-banda').style.display = 'none';
        window.scrollTo(0, 0);
    } else if (pagina === 'pagina-banda') {
        document.getElementById('pagina-principal').style.display = 'none';
        document.getElementById('pagina-banda').style.display = 'block';
        window.scrollTo(0, 0);
    }
}

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
                        <a href="#" onclick="carregarDetalhesBanda(${banda.id}); return false;" class="btn">Ver Detalhes</a>
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
function carregarDetalhesBanda(bandaId) {
    if (!bandaId) return;
    
    const banda = bandasData.find(b => b.id === bandaId);
    if (!banda) return;
    
    // Mostrar a página da banda
    mostrarPagina('pagina-banda');
    
    // Atualizar o título da página
    document.title = `${banda.nome} - Selo Palco Coletivo`;
    
    // Atualizar os elementos da página com os dados da banda
    document.getElementById('banda-nome').textContent = banda.nome;
    document.getElementById('banda-descricao').textContent = banda.descricao;
    document.getElementById('banda-imagem').src = banda.imagem;
    document.getElementById('banda-imagem').alt = banda.nome;
    document.getElementById('banda-imagem').onerror = function() {
        this.src = 'img/placeholder.svg';
    };
    
    const porcentagem = Math.round((banda.arrecadado / banda.meta) * 100);
    
    document.getElementById('banda-arrecadado').textContent = `R$ ${banda.arrecadado},00`;
    document.getElementById('banda-meta').textContent = `R$ ${banda.meta},00`;
    document.getElementById('banda-porcentagem').textContent = `${porcentagem}%`;
    document.getElementById('progresso-preenchido').style.width = `${porcentagem}%`;
    
    // Atualizar o conteúdo do projeto e da banda
    document.getElementById('banda-projeto').textContent = banda.projeto;
    document.getElementById('banda-sobre').textContent = banda.sobre;
    
    // Atualizar o iframe do vídeo
    document.getElementById('banda-video-iframe').src = banda.videoUrl;
    
    // Atualizar o link de apoio
    document.getElementById('banda-apoiar').href = banda.apoiarUrl;
}
