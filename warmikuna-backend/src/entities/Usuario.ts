import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  correo!: string;

  @Column()
  contrasena!: string;

  @Column({ type: "varchar", length: 8, unique: true })
  dni!: string;

  @Column({ default: false })
  es_anonimo!: boolean;

  @CreateDateColumn({ name: "creado_en" })
  creadoEn!: Date;
}