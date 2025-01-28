import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create.user-dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async getByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  async getByName(username: string, email: string): Promise<User[]> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.name : username', { username })
      .andWhere('user.email : email', { email })
      .getMany();

    return result;
  }

  async saveUser(dto: CreateUserDto) {
    return this.userRepository.save(dto);
  }
}
