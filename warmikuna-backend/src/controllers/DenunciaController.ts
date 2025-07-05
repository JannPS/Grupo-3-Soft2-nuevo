import { Request, Response } from "express";
import { denunciaService } from "../services/DenunciaService";
import { CorreoService } from "../services/CorreoService";

export class DenunciaController {
  // Denuncia SIN archivo
  static async crear(req: Request, res: Response) {
    try {
      const { descripcion, anonima } = req.body;
      const correo = req.usuario?.correo;

      if (!correo) {
        return res.status(400).json({ error: "Correo no disponible en el token" });
      }

      const denuncia = await denunciaService.crear(
        correo,
        descripcion,
        anonima === "true"
      );

      // Enviar correo
      const correoService = new CorreoService();
      await correoService.enviar(
        correo,
        "Denuncia registrada con éxito",
        `<p>Hola, tu denuncia fue registrada correctamente en WARMIKUNA.</p>`
      );

      return res.status(201).json({ mensaje: "Denuncia creada exitosamente", denuncia });
    } catch (error: any) {
      console.error("❌ Error en crear:", error);
      return res.status(500).json({ error: "Error al registrar la denuncia" });
    }
  }

  // Denuncia CON archivo
  static async crearConArchivo(req: Request, res: Response) {
    try {
      const { descripcion, anonima } = req.body;
      const archivo = req.file;
      const correo = req.usuario?.correo;

      console.log("📄 Descripción:", descripcion);
      console.log("🧾 Anónima:", anonima);
      console.log("📎 Archivo recibido:", archivo?.filename);
      console.log("📧 Correo:", correo);

      if (!correo) {
        return res.status(400).json({ error: "Correo no disponible en el token" });
      }

      const denuncia = await denunciaService.crearConArchivo(
        correo,
        descripcion,
        anonima === "true",
        archivo?.filename ?? null
      );

      // Enviar correo
      const correoService = new CorreoService();
      await correoService.enviar(
        correo,
        "Denuncia con archivo registrada",
        `<p>Hola, tu denuncia con archivo fue registrada correctamente en WARMIKUNA.</p>`
      );

      return res.status(201).json({ mensaje: "Denuncia registrada con archivo", denuncia });
    } catch (error: any) {
      console.error("❌ Error en crearConArchivo:", error);
      return res.status(500).json({ error: "Error al registrar la denuncia con archivo" });
    }
  }

  // Obtener denuncias por correo
  static async obtenerPorUsuario(req: Request, res: Response) {
    try {
      const correo = req.usuario?.correo;

      if (!correo) {
        return res.status(400).json({ error: "Correo no disponible en el token" });
      }

      const denuncias = await denunciaService.obtenerPorCorreo(correo);
      return res.status(200).json(denuncias);
    } catch (error: any) {
      console.error("❌ Error al obtener denuncias:", error);
      return res.status(500).json({ error: "Error al obtener denuncias" });
    }
  }

  // Cambiar estado de denuncia
    static async cambiarEstado(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nuevoEstado } = req.body;

      const denunciaActualizada = await denunciaService.cambiarEstado(Number(id), nuevoEstado);

      return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        denuncia: denunciaActualizada
      });
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
      return res.status(500).json({ error: "No se pudo actualizar el estado de la denuncia" });
    }
  }
}
