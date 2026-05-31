// Dados em memória compartilhados
export let produtos = [
  { id: 1, nome: "Notebook Dell",    tipo: "Eletrônico",  status: "disponivel",  descricao: "Core i7, 16GB RAM" },
  { id: 2, nome: "Mesa de Escritório", tipo: "Móvel",      status: "emprestado",  descricao: "Tampo de madeira" },
  { id: 3, nome: "Projetor Epson",   tipo: "Eletrônico",  status: "manutencao",  descricao: "3000 lumens" },
];

export const STATUS_VALIDOS = ["disponivel", "emprestado", "manutencao"];