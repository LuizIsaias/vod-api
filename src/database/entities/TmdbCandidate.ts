import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { VodItem } from './VodItem';

@Entity()
export class TmdbCandidate {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => VodItem)
  vodItem!: VodItem;

  @Column({ type: 'simple-json' })
  candidateJson!: any;
}
