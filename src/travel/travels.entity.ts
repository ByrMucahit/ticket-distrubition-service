import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'travel' })
export class TravelsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  source: string;

  @Column()
  departure_time: Date;

  @Column()
  destination: string;

  @Column()
  arrival_time: string;

  @CreateDateColumn()
  created_date: Date;

  @Column({ nullable: false })
  updated_date: Date;

  @Column()
  status: string;
}
