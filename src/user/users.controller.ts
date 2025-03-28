import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UUIDParam } from '../decorator/http.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findUserById(@UUIDParam('id') id: Uuid) {
    return this.usersService.findUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.createUser(createUserDto);
  }
}
