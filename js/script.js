function enviarWhats(event){
    event.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    
    if(nome === "" || mensagem === "") {
        alert("Por favor, preencha seu nome e a mensagem antes de enviar.");
        return;
    }

    const telefone = "5585987689986"; // Garanta que é uma string
    const texto = `Olá! Me chamo ${nome}. ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${telefone}?text=${msgFormatada}`;

    window.open(url, '_blank');
}

//Animação do cabecalho-sub-titulo, projetos-titulo,
const titulos = document.querySelectorAll(
  '.cabecalho-sub-titulo, .projetos-titulo'
);
const observer1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting || window.innerWidth < 600) {
      entry.target.classList.add('animar');
    } else {
      entry.target.classList.remove('animar');
    }
  });
}, {
  threshold: 0.3
});


titulos.forEach(titulo => observer1.observe(titulo));

//Animação do sobre-titulo
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.animate').forEach(el => {
  observer2.observe(el);
});



// Seleção única dos elementos
const elementosIcones = document.querySelectorAll('.icone');
const listaSecoes = document.querySelectorAll('section, main');

// Pontos fixos usando Viewport Units (vw, vh)
const coordenadasFixas = [
    { x: '5vw',  y: '15vh' }, 
    { x: '85vw', y: '20vh' }, 
    { x: '10vw', y: '50vh' }, 
    { x: '80vw', y: '75vh' }, 
    { x: '15vw', y: '85vh' }
];

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function trocarPosicoesIcones() {
    const pontosSorteados = embaralharArray([...coordenadasFixas]);

    elementosIcones.forEach((icone, index) => {
        if (pontosSorteados[index]) {
            const ponto = pontosSorteados[index];
            // Resetamos top/left caso o CSS antigo esteja forçando eles para o canto
            icone.style.top = "0";
            icone.style.left = "0";
            // Usamos apenas o transform para mover
            icone.style.transform = `translate(${ponto.x}, ${ponto.y}) rotate(${Math.random() * 30 - 15}deg)`;
        }
    });
}

// Observador único para o scroll
const observerScrollIcones = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trocarPosicoesIcones();
        }
    });
}, { threshold: 0.2 });

listaSecoes.forEach(s => observerScrollIcones.observe(s));

// Chama ao carregar
window.addEventListener('load', trocarPosicoesIcones);