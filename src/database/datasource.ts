import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import getEnv from '../helpers/getEnv';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: getEnv('HOST'),
            port: Number(getEnv('DB_PORT')),
            username: getEnv('DB_USERNAME'),
            password: String(getEnv('DB_PASSWORD')),
            database: getEnv('DB_NAME'),
            synchronize: true,
            entities: [__dirname + '/dist/../../**/**.entity{.ts,.js}'],
            logging: true,
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DataSourceModule {}
