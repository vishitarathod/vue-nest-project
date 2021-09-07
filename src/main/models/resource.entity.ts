import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

//entity for resource
@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resourceName: string;

  @OneToMany(() => Permission, (permission) => permission.resource)
  permission: Permission[];
}
