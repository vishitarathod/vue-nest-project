import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

//entity for role
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleName: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permission: Permission[];
}
