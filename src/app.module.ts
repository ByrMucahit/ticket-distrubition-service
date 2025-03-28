import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from './database/datasource';
import { UsersModule } from './user/users.module';
import { TicketModule } from './ticket/ticket.module';
import { TravelsModule } from './travel/travels.module';
import { Gateway } from './gateway/gateway';

@Module({
  imports: [DataSourceModule, UsersModule, TicketModule, TravelsModule],
  controllers: [AppController],
  providers: [AppService, Gateway],
})
export class AppModule {}
