// src/services/CorreoService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Asegura que se carguen las variables de entorno

export class CorreoService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async enviar(destinatario: string, asunto: string, contenidoHtml: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"Warmikuna" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      html: contenidoHtml,
    });
  }
}