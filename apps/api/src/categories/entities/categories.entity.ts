import { Base } from '@/common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Categories extends Base {
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: true })
  parent_id: number;
}
