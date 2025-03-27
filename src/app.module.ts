import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from './database/datasource';
import { UsersModule } from './user/users.module';

@Module({
  imports: [DataSourceModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
