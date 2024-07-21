import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';
import { UserRole } from '../enum/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;
}
