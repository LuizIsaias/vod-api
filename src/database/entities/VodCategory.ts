import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { VodItem } from './VodItem';

@Entity()
export class VodCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  xtreamCategoryId!: number;

  @Column()
  name!: string;

  @OneToMany(() => VodItem, (vodItem) => vodItem.category)
  items!: VodItem[];
}
