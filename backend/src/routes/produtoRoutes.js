import { Router } from "express";
import * as produtoController from "../controllers/produtoController.js";

const router = Router();

// Mapeamento das rotas para as funções do controller
router.get("/", produtoController.listar);
router.get("/:id", produtoController.obterPorId);
router.post("/", produtoController.criar);
router.put("/:id", produtoController.atualizar);
router.delete("/:id", produtoController.deletar);

export default router;