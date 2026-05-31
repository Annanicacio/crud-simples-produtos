import express from "express";
import cors from "cors";
import produtoRoutes from "./src/routes/produtoRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Injeta as rotas de produtos prefixadas com /produtos
app.use("/produtos", produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

