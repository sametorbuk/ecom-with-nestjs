import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create.user-dto';
import { User } from 'src/user/entities/user.entity';
import { CreateLoginUserDto } from 'src/user/dto/create.loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<User> {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: CreateLoginUserDto) {
    return await this.authService.login(dto.email, dto.password);
  }
}
