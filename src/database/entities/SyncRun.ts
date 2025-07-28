import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SyncRun {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime' })
  startedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  finishedAt?: Date;

  @Column()
  status!: 'success' | 'error';

  @Column({ default: 0 })
  inserted!: number;

  @Column({ default: 0 })
  updated!: number;

  @Column({ default: 0 })
  skipped!: number;

  @Column({ type: 'simple-json', nullable: true })
  errorsJson?: any;
}
