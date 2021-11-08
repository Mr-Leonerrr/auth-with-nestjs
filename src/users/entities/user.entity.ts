import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar2', length: 100, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar2', length: 250, nullable: false })
  email: string;

  @Column({ type: 'varchar2', length: 16, nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with local time zone' })
  deletedAt: Date;
}
