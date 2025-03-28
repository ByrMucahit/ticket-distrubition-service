import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelsEntity } from './travels.entity';
import { TravelsService } from './travels.service';
import { TravelsDataAccess } from './travels.data-access';
import { TravelsController } from './travels.controller';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TravelsEntity]), TicketModule],
  exports: [TravelsService],
  controllers: [TravelsController],
  providers: [TravelsService, TravelsDataAccess],
})
export class TravelsModule {}
