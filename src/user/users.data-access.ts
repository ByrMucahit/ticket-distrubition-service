import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersDataAccess {
  constructor(@InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>) {}

  async findUserById(id: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const userEntity = this.usersRepository.create(createUserDto);
    userEntity.updated_at = new Date();
    return this.usersRepository.save(userEntity);
  }
}
