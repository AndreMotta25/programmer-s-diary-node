import { randomBytes } from 'crypto';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Card } from '../../cards/entities/Card';

@Entity()
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'avatar_default.jpg' })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @Column()
  hashToken: string;

  @Column({ default: false })
  email_confirmed: boolean;

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  constructor() {
    this.id = uuid();
    this.hashToken = randomBytes(16).toString('hex');
  }
}

export { User };
