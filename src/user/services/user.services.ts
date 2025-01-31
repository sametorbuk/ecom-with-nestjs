import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

import { CreateUserDto } from '../dto/create.user-dto';
import { EcomException } from 'src/exception/ecomException';

import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async getByName(username: string, email: string): Promise<User[]> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.name : username', { username })
      .andWhere('user.email : email', { email })
      .getMany();

    return result;
  }

  async saveUser(dto: CreateUserDto) {
    try {
      console.log('Received DTO:', dto);
      console.log(this.userRepository);

      const foundUser = await this.userRepository.findByEmail(dto.email);

      if (foundUser) {
        throw new EcomException(
          'This email already exist in system',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = new User();
      user.email = dto.email;
      user.password = await this.hashPassword(dto.password);
      user.username = dto.username;

      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Internal server error');
    }
  }

  async updateUser(dto: CreateUserDto, id: number) {
    const foundUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id : id', { id })
      .getMany();

    if (foundUser.length == 0) {
      throw new EcomException(
        'There is no user with this id',
        HttpStatus.NOT_FOUND,
      );
    }

    if (id <= 0) {
      throw new EcomException('Id cannot less than 1', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update(id, { ...dto });

    return await this.userRepository.findOne({ where: { id } });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
