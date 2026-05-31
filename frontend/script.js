const API = "http://localhost:3000"; // endereço do backend

/** Exibe mensagem de feedback na div #mensagem */
function mostrarMensagem(texto, tipo = "sucesso") {
  const div = document.getElementById("mensagem");
  div.textContent = texto;
  div.className = tipo;          // classe "sucesso" ou "erro"
  div.style.display = "block";
  // some sozinha após 3 segundos
  setTimeout(() => { div.style.display = "none"; }, 3000);
}

/** Retorna a classe CSS do badge de status */
function classeBadge(status) {
  return {
    disponivel: "badge-disponivel",
    emprestado: "badge-emprestado",
    manutencao: "badge-manutencao",
  }[status] ?? "";
}


// GET /produtos — com filtros
async function carregarProdutos() {
  const nome = document.getElementById("filtro-nome").value;
  const tipo = document.getElementById("filtro-tipo").value;
  const status = document.getElementById("filtro-status").value;

  // Monta os query params apenas com os campos preenchidos
  const params = new URLSearchParams();
  if (nome) params.append("nome", nome);
  if (tipo) params.append("tipo", tipo);
  if (status) params.append("status", status);

  try {
    const resposta = await fetch(`${API}/produtos?${params}`);
    const produtos = await resposta.json();
    renderizarTabela(produtos);
  } catch (err) {
    mostrarMensagem("Erro ao conectar com o servidor.", "erro");
  }
}

/** Preenche o <tbody> com os produtos recebidos */
function renderizarTabela(produtos) {
  const tbody = document.getElementById("corpo-tabela");
  tbody.innerHTML = ""; // limpa antes de repopular

  if (produtos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#888">Nenhum produto encontrado.</td></tr>`;
    return;
  }

  produtos.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${p.tipo}</td>
      <td><span class="badge ${classeBadge(p.status)}">${p.status}</span></td>
      <td>${p.descricao || "—"}</td>
      <td>
        <button class="btn-warning" onclick="prepararEdicao(${p.id})">✏️ Editar</button>
        <button class="btn-danger"  onclick="excluirProduto(${p.id})">🗑 Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


// POST /produtos — cria novo produto

async function criarProduto(dados) {
  const resposta = await fetch(`${API}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.erro);
  }

  return resposta.json();
}


// PUT /produtos/:id — atualiza produto

async function atualizarProduto(id, dados) {
  const resposta = await fetch(`${API}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.erro);
  }

  return resposta.json();
}


// DELETE /produtos/:id — remove produto com confirmação

async function excluirProduto(id) {
  const confirma = confirm(`Deseja mesmo excluir o produto #${id}?`);
  if (!confirma) return;

  try {
    const resposta = await fetch(`${API}/produtos/${id}`, { method: "DELETE" });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.erro);
    }

    mostrarMensagem(`Produto #${id} excluído com sucesso!`);
    carregarProdutos();
  } catch (err) {
    mostrarMensagem(err.message, "erro");
  }
}


// Botão Editar — pré-preenche o formulário com GET/:id

async function prepararEdicao(id) {
  try {
    const resposta = await fetch(`${API}/produtos/${id}`);
    if (!resposta.ok) throw new Error("Produto não encontrado.");

    const produto = await resposta.json();

    // Preenche cada campo do formulário
    document.getElementById("id-editando").value = produto.id;
    document.getElementById("campo-nome").value = produto.nome;
    document.getElementById("campo-tipo").value = produto.tipo;
    document.getElementById("campo-status").value = produto.status;
    document.getElementById("campo-descricao").value = produto.descricao ?? "";

    // Muda o visual para indicar modo edição
    document.getElementById("titulo-form").textContent = `Editando produto #${produto.id}`;
    document.getElementById("btn-salvar").textContent = "Atualizar";
    document.getElementById("btn-cancelar").style.display = "inline-block";

    // Rola a página até o formulário
    document.getElementById("secao-form").scrollIntoView({ behavior: "smooth" });

  } catch (err) {
    mostrarMensagem(err.message, "erro");
  }
}

/** Cancela o modo de edição e reseta o formulário */
function cancelarEdicao() {
  document.getElementById("form-produto").reset();
  document.getElementById("id-editando").value = "";
  document.getElementById("titulo-form").textContent = "➕ Novo Produto";
  document.getElementById("btn-salvar").textContent = "💾 Salvar";
  document.getElementById("btn-cancelar").style.display = "none";
}

// ------------------------------------------------------------------
// Submit do formulário — decide entre POST e PUT
// ------------------------------------------------------------------
document.getElementById("form-produto").addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const idEditando = document.getElementById("id-editando").value;

  const dados = {
    nome: document.getElementById("campo-nome").value.trim(),
    tipo: document.getElementById("campo-tipo").value.trim(),
    status: document.getElementById("campo-status").value,
    descricao: document.getElementById("campo-descricao").value.trim(),
  };

  try {
    if (idEditando) {
      await atualizarProduto(idEditando, dados);
      mostrarMensagem(`Produto #${idEditando} atualizado com sucesso!`);
      cancelarEdicao();
    } else {
      const novo = await criarProduto(dados);
      mostrarMensagem(`Produto "${novo.nome}" criado com sucesso!`);
      document.getElementById("form-produto").reset();
    }

    carregarProdutos();
  } catch (err) {
    mostrarMensagem(err.message, "erro");
  }
});


// Filtros: dispara busca ao pressionar Enter nos campos de texto

["filtro-nome", "filtro-tipo"].forEach((id) => {
  document.getElementById(id).addEventListener("keyup", (e) => {
    if (e.key === "Enter") carregarProdutos();
  });
});

document.getElementById("filtro-status").addEventListener("change", carregarProdutos);

function limparFiltros() {
  document.getElementById("filtro-nome").value = "";
  document.getElementById("filtro-tipo").value = "";
  document.getElementById("filtro-status").value = "";
  carregarProdutos();
}

// Carrega os produtos ao abrir a página
carregarProdutos();