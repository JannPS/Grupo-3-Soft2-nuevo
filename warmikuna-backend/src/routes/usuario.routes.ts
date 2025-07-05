import { Router, RequestHandler } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();

router.post("/registrar", UsuarioController.registrar as RequestHandler);
router.post("/login", UsuarioController.login as RequestHandler);
router.post("/recuperar-contrasena", UsuarioController.recuperarContrasena as RequestHandler);

router.get("/", (_req, res) => {
  res.send("✅ Ruta GET /api/usuarios funcionando correctamente");
});

export default router;
