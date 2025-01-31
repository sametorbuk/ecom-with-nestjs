import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export interface UserRepository extends Repository<User> {
  this: Repository<User>;
  getUsers(): Promise<User[]>;
  getUser(id: number): Promise<User>;
  createUser(user: { firstName: string; lastName: string; isActive: boolean });
  findbyEmail(email: string): Promise<User>;
}

export const customUserRepository: Pick<UserRepository, any> = {
  getUser(this: Repository<User>, id: number) {
    return this.findOne({ where: { id } });
  },

  getUsers(this: Repository<User>) {
    return this.find();
  },

  createUser(this: Repository<User>, user: User) {
    return this.save(user);
  },

  findbyEmail(this: Repository<User>, email: string) {
    return this.findOne({ where: { email } });
  },
};
