import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Resource } from './resource.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  read: boolean;

  @Column()
  write: boolean;

  @Column()
  update: boolean;

  @Column()
  delete: boolean;

  @Column()
  roleId: string;

  @Column()
  resourceId: string;

  @ManyToOne(() => Role, (role) => role.permission)
  role: Role;

  @ManyToOne(() => Resource, (resource) => resource.permission)
  resource: Resource;
}
