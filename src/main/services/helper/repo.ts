import { Permission } from 'src/main/models/permission.entity';
import { Resource } from 'src/main/models/resource.entity';
import { User } from 'src/main/models/user.entity';
import { EntityRepository, Repository } from 'typeorm';
// import { User } from '../entity/User';

@EntityRepository(Resource)
export class ResourceRepository extends Repository<Resource> {}

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
