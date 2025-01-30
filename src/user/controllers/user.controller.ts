import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from '../services/user.services';
import { CreateUserDto } from '../dto/create.user-dto';
import { EcomException } from 'src/exception/ecomException';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async saveUser(@Body() dto: CreateUserDto) {
    if (!dto.email || !dto.password || !dto.username) {
      throw new EcomException(
        'Please enter a valid data',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.saveUser(dto);
  }

  @Put(':id')
  async updateUser(
    @Body() dto: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(dto, id);
  }
}
