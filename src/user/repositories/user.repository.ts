import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserRepository extends Repository<User> {
  async findByUsername(username: string) {
    return this.findOne({ where: { username } });
  }

  async findByEmail(email: string) {
    return await this.createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .getOne();
  }
}
