import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UUIDParam } from '../decorator/http.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findUserById(@UUIDParam('id') id: Uuid) {
    return this.usersService.findUserById(id);
  }
}
