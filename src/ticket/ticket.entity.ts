import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tickets' })
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  user_id: string;

  @Column()
  travel_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: false })
  updated_at!: Date;

  @Column()
  status: string;
}
