import { Injectable } from '@nestjs/common';
import { UsersDataAccess } from './users.data-access';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private usersDataAccess: UsersDataAccess) {}

  async findUserById(id: string): Promise<UsersEntity | null> {
    return this.usersDataAccess.findUserById(id);
  }
}
