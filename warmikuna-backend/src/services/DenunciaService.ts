import { AppDataSource } from "../database/data-source";
import { Denuncia } from "../entities/Denuncia";
import { CorreoService } from "./CorreoService";

class DenunciaService {
  private denunciaRepository = AppDataSource.getRepository(Denuncia);
  private correoService = new CorreoService();

  // 🟢 Registrar denuncia sin archivo
  async crear(correo: string, descripcion: string, anonima: boolean) {
    const denuncia = this.denunciaRepository.create({
      descripcion,
      anonima,
      estado: "en revisión",
      creada_en: new Date(),
      correo_usuario: correo,
    });

    const guardada = await this.denunciaRepository.save(denuncia);

    await this.correoService.enviar(
      correo,
      "Registro de denuncia exitoso",
      `<p>Hola,</p><p>Tu denuncia fue registrada con éxito.</p><p><strong>Descripción:</strong> ${descripcion}</p>`
    );

    return guardada;
  }

  // 🟢 Registrar denuncia con archivo
  async crearConArchivo(correo: string, descripcion: string, anonima: boolean, evidenciaArchivo: string | null) {
    const denuncia = this.denunciaRepository.create({
      descripcion,
      anonima,
      estado: "en revisión",
      creada_en: new Date(),
      evidenciaArchivo: evidenciaArchivo ?? null,
      correo_usuario: correo,
    });

    const guardada = await this.denunciaRepository.save(denuncia);

    await this.correoService.enviar(
      correo,
      "Registro de denuncia con archivo",
      `<p>Hola,</p><p>Tu denuncia fue registrada exitosamente y se adjuntó un archivo.</p><p><strong>Descripción:</strong> ${descripcion}</p>`
    );

    return guardada;
  }

  // 🔎 Obtener denuncias por correo
  async obtenerPorCorreo(correo: string) {
    return this.denunciaRepository.find({
      where: { correo_usuario: correo },
      order: { creada_en: "DESC" },
    });
  }

  // 🟡 Cambiar estado y enviar correo
  async cambiarEstado(id: number, nuevoEstado: string) {
    const denuncia = await this.denunciaRepository.findOneBy({ id });

    if (!denuncia) {
      throw new Error("Denuncia no encontrada");
    }

    denuncia.estado = nuevoEstado;
    const guardada = await this.denunciaRepository.save(denuncia);

    await this.correoService.enviar(
      denuncia.correo_usuario,
      "Actualización del estado de tu denuncia",
      `<p>Hola,</p><p>El estado de tu denuncia ha sido actualizado a: <strong>${nuevoEstado}</strong>.</p>`
    );

    return guardada;
  }
}

export const denunciaService = new DenunciaService();