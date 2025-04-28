import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../users/models/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;

  @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
  parent!: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date | null;
}