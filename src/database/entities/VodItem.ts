import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { VodCategory } from "./VodCategory";
import { TmdbMovie } from "./TmdbMovie";

@Entity()
export class VodItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  xtreamVodId!: number;

  @Column()
  titleOriginal!: string;

  @Column()
  titleNormalized!: string;

  @ManyToOne(() => VodCategory, (category) => category.items, {
    nullable: true,
    onDelete: "SET NULL",
  })
  category!: VodCategory;

  @Column({ nullable: true })
  streamIcon?: string;

  @Column({ type: "datetime" })
  addedAtXtream!: Date;

  @Column({ nullable: true })
  containerExtension?: string;

  @OneToOne(() => TmdbMovie, (tmdb) => tmdb.vodItem)
  tmdbMovie?: TmdbMovie;
}
