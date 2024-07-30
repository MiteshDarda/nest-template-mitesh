import { BaseEntity } from 'src/database/base.entity';
import { Role } from 'src/roles/roles.enum';
import { Column, Entity } from 'typeorm';

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

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
