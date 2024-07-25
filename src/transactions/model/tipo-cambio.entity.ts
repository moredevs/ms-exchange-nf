import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Moneda } from './moneda.entity';
import { Transaccion } from './transaccion.entity';
 

@Entity()
export class TipoCambio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Moneda, moneda => moneda.tipoCambiosOrigen)
  monedaOrigen: Moneda;

  @ManyToOne(() => Moneda, moneda => moneda.tipoCambiosDestino)
  monedaDestino: Moneda;

  @Column({ type: 'decimal',   scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  fecha: Date;

  @OneToMany(() => Transaccion, transaccion => transaccion.tipoCambio)
  transacciones: Transaccion[];
}
