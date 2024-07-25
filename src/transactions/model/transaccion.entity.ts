// src/transaccion/transaccion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn, BeforeInsert  } from 'typeorm';
import { TipoCambio } from './tipo-cambio.entity';
 import { Moneda } from './moneda.entity';
import * as moment from 'moment-timezone';
import { Usuario } from '../../auth/model/usuario.entity';

@Entity()
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  monto: number;

  @Column({ type: 'double' })
  montoConvertido: number;

  @ManyToOne(() => TipoCambio, tipoCambio => tipoCambio.transacciones)
  tipoCambio: TipoCambio;

  @ManyToOne(() => Usuario, usuario => usuario.transacciones)
  usuario: Usuario;

  @Column({ type: 'datetime' })
  fecha: Date;
  
  @BeforeInsert()
  updateDates() {
      this.fecha = moment().tz('America/Bogota').toDate();
  }

  @Column({name: 'tipo_cambio_id'})
  tipoCambioId: string

  @Column({name: 'moneda_origen'})
  monedaOrigen: string

  @Column({name: 'moneda_destino'})
  monedaDestino: string

  @ManyToOne(() => Moneda, { nullable: true })
  @JoinColumn({ name: 'moneda_destino' })  
  monedaDestinoM: Moneda;

  @ManyToOne(() => Moneda, { nullable: true })
  @JoinColumn({ name: 'moneda_origen' })  
  monedaOrigenM: Moneda;
}
