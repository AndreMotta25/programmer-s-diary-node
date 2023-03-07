import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../../accounts/entities/User';

@Entity()
class Card {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  language: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'text', default: '' })
  code: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  user: User;

  constructor() {
    this.id = uuidV4();
  }
}

export { Card };
