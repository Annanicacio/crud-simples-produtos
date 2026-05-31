import { produtos, STATUS_VALIDOS } from "../data/bancoEmMemoria.js";

export const listar = (req, res) => {
  const { nome, tipo, status } = req.query;
  let resultado = produtos;

  if (nome) resultado = resultado.filter((p) => p.nome.toLowerCase().includes(nome.toLowerCase()));
  if (tipo) resultado = resultado.filter((p) => p.tipo.toLowerCase().includes(tipo.toLowerCase()));
  if (status) resultado = resultado.filter((p) => p.status === status);

  res.json(resultado);
};

export const obterPorId = (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });
  res.json(produto);
};

export const criar = (req, res) => {
  const { nome, tipo, status = "disponivel", descricao = "" } = req.body;

  if (!nome || !tipo) {
    return res.status(400).json({ erro: "Os campos 'nome' e 'tipo' são obrigatórios." });
  }

  if (!STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ erro: `Status inválido. Use: ${STATUS_VALIDOS.join(", ")}.` });
  }

  const novoId = Math.max(0, ...produtos.map((p) => p.id)) + 1;
  const novoProduto = { id: novoId, nome, tipo, status, descricao };
  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
};

export const atualizar = (req, res) => {
  const id = Number(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ erro: "Produto não encontrado." });

  const { nome, tipo, status, descricao } = req.body;

  if (!nome || !tipo) {
    return res.status(400).json({ erro: "Os campos 'nome' e 'tipo' são obrigatórios." });
  }
  if (status && !STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ erro: `Status inválido. Use: ${STATUS_VALIDOS.join(", ")}.` });
  }

  produtos[index] = {
    ...produtos[index],
    nome,
    tipo,
    status: status ?? produtos[index].status,
    descricao: descricao ?? produtos[index].descricao,
  };

  res.json(produtos[index]);
};

export const deletar = (req, res) => {
  const id = Number(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ erro: "Produto não encontrado." });

  produtos.splice(index, 1);
  res.status(204).send();
};