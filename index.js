document.addEventListener("DOMContentLoaded", function() {
    const itensCarrossel = document.querySelectorAll('.item-carrossel');
    const botaoAnterior = document.getElementById('botaoAnterior');
    const botaoProximo = document.getElementById('botaoProximo');
    const containerCategorias = document.getElementById('container-categorias');
    let indiceAtual = 0;

    function mostrarSlide(indice) {
        itensCarrossel.forEach((item, i) => {
            item.classList.remove('ativo');
            if (i === indice) {
                item.classList.add('ativo');
            }
        });
    }

    mostrarSlide(indiceAtual);

    botaoAnterior.addEventListener('click', () => {
        indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : itensCarrossel.length - 1;
        mostrarSlide(indiceAtual);
    });

    botaoProximo.addEventListener('click', () => {
        indiceAtual = (indiceAtual < itensCarrossel.length - 1) ? indiceAtual + 1 : 0;
        mostrarSlide(indiceAtual);
    });

    fetch('https://fakestoreapi.com/products')
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error('A resposta da rede não foi bem-sucedida: ' + resposta.statusText);
        }
        return resposta.json();
    })
    .then(dados => {
        // Atualizar o carrossel
        const itensCarrossel = document.querySelectorAll('.item-carrossel');
        dados.slice(0, 4).forEach((produto, i) => {
            if (itensCarrossel[i + 1]) { // +1 porque o primeiro item é local
                const img = itensCarrossel[i + 1].querySelector('img');
                img.src = produto.image;
                img.alt = produto.title;
            }
        });

        // Atualizar os cartões de produtos
        const cartoesProdutos = document.querySelectorAll('.cartao-produto');
        const imagensAPI = document.querySelectorAll('.cartao-produto img');
        const titulos = document.querySelectorAll('.titulo-produto');
        const precos = document.querySelectorAll('.preco-produto');

        dados.slice(0, 4).forEach((produto, i) => {
            if (cartoesProdutos[i]) {
                imagensAPI[i].src = produto.image;
                imagensAPI[i].alt = produto.title;
                titulos[i].textContent = produto.title;
                precos[i].textContent = `$${produto.price.toFixed(2)}`;
            }
        });

        // Atualizar os botões de categorias
        const categorias = [
            { name: 'Jaquetas', image: 'imagens/jaqueta.jpg' },
            { name: 'Sapatos', image: 'imagens/sapato.png' },
            { name: 'Bolsas', image: 'imagens/bolsa.png' },
            { name: 'Acessórios', image: 'imagens/acessorio.png' }
        ];
    
        categorias.forEach(categoria => {
            const botao = document.createElement('button');
            botao.classList.add('botao-categoria');
            botao.innerHTML = `
                <img src="${categoria.image}" alt="${categoria.name}">
                <span>${categoria.name}</span>
            `;
            containerCategorias.appendChild(botao);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });
});
