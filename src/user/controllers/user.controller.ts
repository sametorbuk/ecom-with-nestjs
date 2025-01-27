import { Controller, Get } from '@nestjs/common';

import { UserService } from '../services/user.services';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByUserName(username: string) {
    return await this.userService.getByUsername(username);
  }
}
