import { Transaccion } from '../../transactions/model/transaccion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
 
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreUsuario: string;

  @Column()
  password: string;

  @OneToMany(() => Transaccion, transaccion => transaccion.usuario)
  transacciones: Transaccion[];
}
