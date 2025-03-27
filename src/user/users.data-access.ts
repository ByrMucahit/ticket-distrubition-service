import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDataAccess {
  constructor(@InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>) {}

  async findUserById(id: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
