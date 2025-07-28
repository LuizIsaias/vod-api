import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { VodItem } from './VodItem';

@Entity()
export class TmdbMovie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tmdbId!: number;

  @OneToOne(() => VodItem, (vodItem) => vodItem.tmdbMovie)
  @JoinColumn()
  vodItem!: VodItem;

  @Column({ type: 'text', nullable: true })
  overview?: string;

  @Column({ nullable: true })
  posterPath?: string;

  @Column({ nullable: true })
  backdropPath?: string;

  @Column({ nullable: true })
  releaseDate?: string;

  @Column({ nullable: true })
  runtime?: number;

  @Column({ nullable: true })
  voteAverage?: number;

  @Column({ type: 'simple-json', nullable: true })
  genres?: string[];
}
