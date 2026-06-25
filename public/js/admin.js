// Painel do administrador: login com JWT (guardado em sessionStorage) e
// cadastro/listagem/remoção de poções via AJAX.
(function () {
  const TOKEN_KEY = 'webpotions_token';

  const loginView = document.getElementById('login-view');
  const painelView = document.getElementById('painel-view');
  const loginForm = document.getElementById('login-form');
  const loginAviso = document.getElementById('login-aviso');
  const cadastroForm = document.getElementById('cadastro-form');
  const painelAviso = document.getElementById('painel-aviso');
  const listaAdmin = document.getElementById('lista-admin');
  const sessaoInfo = document.getElementById('sessao-info');

  // ---- Helpers de token / sessão ----
  function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  function clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  function mostrarPainel() {
    loginView.classList.add('escondido');
    painelView.classList.remove('escondido');
    sessaoInfo.textContent = 'Sessão ativa. A sessão expira automaticamente.';
    carregarLista();
  }

  function mostrarLogin(msg) {
    clearToken();
    painelView.classList.add('escondido');
    loginView.classList.remove('escondido');
    if (msg) {
      loginAviso.textContent = msg;
      loginAviso.classList.remove('escondido');
    }
  }

  function aviso(el, msg, ok) {
    el.textContent = msg;
    el.classList.remove('escondido', 'aviso-ok', 'aviso-erro');
    el.classList.add(ok ? 'aviso-ok' : 'aviso-erro');
  }

  // Wrapper de fetch que injeta o token e trata expiração (401 -> volta ao login).
  async function apiFetch(url, options = {}) {
    const opts = { ...options, headers: { ...(options.headers || {}) } };
    const token = getToken();
    if (token) opts.headers.Authorization = 'Bearer ' + token;

    const resp = await fetch(url, opts);
    if (resp.status === 401) {
      mostrarLogin('Sua sessão expirou. Faça login novamente.');
      throw new Error('unauthorized');
    }
    return resp;
  }

  function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // ---- Login ----
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    loginAviso.classList.add('escondido');

    const username = document.getElementById('login-usuario').value.trim();
    const password = document.getElementById('login-senha').value;

    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        aviso(loginAviso, data.error || 'Falha no login.', false);
        return;
      }

      setToken(data.token);
      loginForm.reset();
      mostrarPainel();
    } catch (err) {
      aviso(loginAviso, 'Erro de conexão com o servidor.', false);
    }
  });

  // ---- Sair ----
  document.getElementById('btn-sair').addEventListener('click', function () {
    mostrarLogin('Você saiu da sessão.');
  });

  // ---- Cadastro ----
  cadastroForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const payload = {
      name: document.getElementById('campo-nome').value.trim(),
      description: document.getElementById('campo-descricao').value.trim(),
      price: document.getElementById('campo-preco').value,
      image: document.getElementById('campo-imagem').value.trim(),
    };

    try {
      const resp = await apiFetch('/api/potions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();

      if (!resp.ok) {
        aviso(painelAviso, data.error || 'Falha ao cadastrar.', false);
        return;
      }

      aviso(painelAviso, `Poção "${data.name}" cadastrada!`, true);
      cadastroForm.reset();
      carregarLista();
    } catch (err) {
      if (err.message !== 'unauthorized') {
        aviso(painelAviso, 'Erro de conexão com o servidor.', false);
      }
    }
  });

  // ---- Listagem + remoção ----
  function montarItem(potion) {
    const li = document.createElement('li');
    li.className = 'item-admin';

    const img = document.createElement('img');
    img.src = potion.image;
    img.alt = potion.name;
    img.onerror = function () {
      this.src = 'https://via.placeholder.com/64?text=%3F';
    };

    const info = document.createElement('div');
    info.className = 'info';
    const nome = document.createElement('strong');
    nome.textContent = potion.name;
    const preco = document.createElement('span');
    preco.textContent = ' — ' + formatarPreco(potion.price);
    info.appendChild(nome);
    info.appendChild(preco);

    const btn = document.createElement('button');
    btn.className = 'btn btn-perigo';
    btn.textContent = 'Remover';
    btn.addEventListener('click', () => removerPotion(potion.id, potion.name));

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(btn);
    return li;
  }

  async function carregarLista() {
    try {
      const resp = await apiFetch('/api/potions');
      const potions = await resp.json();

      listaAdmin.innerHTML = '';
      if (potions.length === 0) {
        listaAdmin.innerHTML =
          '<li class="descricao-produto">Nenhuma poção cadastrada.</li>';
        return;
      }
      potions.forEach((p) => listaAdmin.appendChild(montarItem(p)));
    } catch (err) {
      // 401 já tratado em apiFetch.
    }
  }

  async function removerPotion(id, nome) {
    if (!confirm(`Remover a poção "${nome}"?`)) return;

    try {
      const resp = await apiFetch('/api/potions/' + id, { method: 'DELETE' });
      if (resp.ok) {
        aviso(painelAviso, `Poção "${nome}" removida.`, true);
        carregarLista();
      } else {
        const data = await resp.json().catch(() => ({}));
        aviso(painelAviso, data.error || 'Falha ao remover.', false);
      }
    } catch (err) {
      if (err.message !== 'unauthorized') {
        aviso(painelAviso, 'Erro de conexão com o servidor.', false);
      }
    }
  }

  // ---- Estado inicial ----
  if (getToken()) {
    mostrarPainel();
  } else {
    mostrarLogin();
  }
})();
