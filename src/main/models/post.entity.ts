import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

//entity for post
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  discription: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.post)
  user: User;
}
