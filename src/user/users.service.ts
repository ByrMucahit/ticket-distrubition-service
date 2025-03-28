import { Injectable } from '@nestjs/common';
import { UsersDataAccess } from './users.data-access';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Gateway } from '../gateway/gateway';

@Injectable()
export class UsersService {
  constructor(
    private usersDataAccess: UsersDataAccess,
    private gateway: Gateway,
  ) {}

  async findUserById(id: string): Promise<UsersEntity | null> {
    return this.usersDataAccess.findUserById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const user = await this.usersDataAccess.createUser(createUserDto);
    this.gateway.sendToAll(user.firstname);
    return user;
  }
}
