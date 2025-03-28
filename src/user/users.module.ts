import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersDataAccess } from './users.data-access';
import { UsersController } from './users.controller';
import { Gateway } from '../gateway/gateway';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, UsersDataAccess, Gateway],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
