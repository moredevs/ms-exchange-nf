// src/moneda/moneda.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TipoCambio } from './tipo-cambio.entity';
 
@Entity()
export class Moneda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  nombre: string;

  @OneToMany(() => TipoCambio, tipoCambio => tipoCambio.monedaOrigen)
  tipoCambiosOrigen: TipoCambio[];

  @OneToMany(() => TipoCambio, tipoCambio => tipoCambio.monedaDestino)
  tipoCambiosDestino: TipoCambio[];
}
