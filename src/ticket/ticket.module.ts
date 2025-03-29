import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './ticket.entity';
import { TicketService } from './ticket.service';
import { TicketDataAccess } from './ticket.data-access';
import { TicketController } from './ticket.controller';
import { TravelsService } from '../travel/travels.service';
import { TravelsDataAccess } from '../travel/travels.data-access';
import { TravelsEntity } from '../travel/travels.entity';
import { Gateway } from '../gateway/gateway';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TicketEntity, TravelsEntity])],
  providers: [TicketService, TicketDataAccess, TravelsService, TravelsDataAccess, Gateway],
  exports: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
