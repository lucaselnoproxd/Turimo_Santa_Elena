import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  mes: number;

  @Column('int', { nullable: true })
  dia: number | null;

  @Column()
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column('int')
  estrellas: number;

  @Column()
  tipo: string;

  @Column('boolean', { default: false })
  movil: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: string;
}
