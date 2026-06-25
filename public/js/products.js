// Seção Produtos do site público: busca as poções via AJAX e monta os cards.
(function () {
  const grid = document.getElementById('produtos-grid');
  const status = document.getElementById('produtos-status');

  function formatarPreco(valor) {
    // Os valores das poções são expressos em "moedas" (conforme o enunciado).
    return Number(valor).toLocaleString('pt-BR') + ' moedas';
  }

  function montarCard(potion) {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${potion.image}" alt="${potion.name}"
           onerror="this.src='https://via.placeholder.com/400x300?text=Po%C3%A7%C3%A3o'" />
      <div class="card-corpo">
        <h3></h3>
        <p class="descricao-produto"></p>
        <div class="preco"></div>
        <button class="btn btn-comprar">Comprar</button>
      </div>`;

    // Preenche textos via textContent para evitar injeção de HTML.
    card.querySelector('h3').textContent = potion.name;
    card.querySelector('.descricao-produto').textContent = potion.description;
    card.querySelector('.preco').textContent = formatarPreco(potion.price);

    card.querySelector('.btn-comprar').addEventListener('click', function () {
      alert(`"${potion.name}" adicionada ao seu caldeirão!`);
    });

    return card;
  }

  async function carregarPotions() {
    try {
      const resp = await fetch('/api/potions');
      if (!resp.ok) throw new Error('Falha na requisição');
      const potions = await resp.json();

      grid.innerHTML = '';
      if (potions.length === 0) {
        grid.innerHTML =
          '<p class="descricao-produto">Nenhuma poção disponível no momento.</p>';
        return;
      }

      potions.forEach((p) => grid.appendChild(montarCard(p)));
    } catch (err) {
      if (status) status.textContent = 'Não foi possível carregar as poções.';
    }
  }

  carregarPotions();
})();
