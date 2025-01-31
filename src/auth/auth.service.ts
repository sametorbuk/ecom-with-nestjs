import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create.user-dto';
import { UserService } from 'src/user/services/user.services';
import { User } from 'src/user/entities/user.entity';
import { EcomException } from 'src/exception/ecomException';
import { UserRepository } from 'src/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private userRepository: UserRepository,
  ) {}
  async register(dto: CreateUserDto): Promise<User> {
    if (!dto.username || !dto.email || !dto.password) {
      throw new EcomException(
        'Please enter a valid data',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.saveUser(dto);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new EcomException(
        'There is no user with this id',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new EcomException('Password is not valid', HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
