# Objetivo da atividade 

Essa é uma atividade da disciplina de Desenvolvimento web para demonstrar os conhecimentos na manipulação do backend com javascript e express, com as rotas de listar produtos, apagar, editar e atualizar, utilizando o padrão REST. 

## Integrantes

Feito por Anna Carolina Nicacio Neves.

## Estrutura de pastas 

``` text

crud-produtos/
├── backend/                  # Código-fonte do servidor API
│   ├── node_modules/         # Dependências instaladas
│   ├── src/
│   │   ├── controllers/      # Regras de negócio (produtoController.js)
│   │   ├── data/             # Banco em memória (bancoEmMemoria.js)
│   │   └── routes/           # Definição das rotas (produtoRoutes.js)
│   ├── bun.lock              # Arquivo de trava do Bun
│   ├── package.json          # Configurações e scripts do backend
│   └── server.js             # Inicialização do Express
├── frontend/                 # Interface da aplicação
│   ├── index.html            # Estrutura visual e formulários
│   ├── script.js             # Consumo da API via Fetch
│   └── style.css             # Estilização da página
└── README.md                 # Instruções de execução e documentação
```

## Tecnologias Utilizadas
- **Runtime do Servidor:** Bun 
- **Framework Backend:** Express 
- **Linguagem de Programação:** JavaScript 
- **Persistência de Dados:** Em memória (Array compartilhado) 
- **Interface Visual:** HTML5, CSS3 e JavaScript Vanilla (Manipulação do DOM e Fetch API) 

## Rotas da API (Padrão REST)
O backend expõe as seguintes rotas sob o prefixo `/produtos`:

| Método | Rota | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/produtos` | Lista os produtos aplicando filtros opcionais por nome, tipo e status. | `200 OK` |
| **GET** | `/produtos/:id` | Retorna um único produto pelo ID. Retorna 404 caso não exista. | `200 OK` / `404` |
| **POST** | `/produtos` | Cria um novo produto com ID gerado automaticamente. Requer validação. | `201 Created` / `400` |
| **PUT** | `/produtos/:id` | Atualiza os dados de um produto existente com base no ID. | `200 OK` / `404` / `400` |
| **DELETE** | `/produtos/:id` | Remove permanentemente um produto do array através de seu ID. | `204 No Content` / `404` |

As validações do sistema impedem cadastros sem nome ou tipo, e restringem o status para `disponivel`, `emprestado` ou `manutencao`

##  Como Rodar o Projeto

### 1. Inicializando o Backend
Certifique-se de ter o **Bun** instalado em sua máquina. No terminal, acesse a pasta do backend e execute os comandos abaixo[cite: 47]:

```bash
# Navegar até a pasta backend
cd backend

# Instalar as dependências do projeto
bun install

# Executar o servidor em modo de desenvolvimento
bun run dev
```
E então, para acessar a interface:
http://127.0.0.1:5500/frontend/
