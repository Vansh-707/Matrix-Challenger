import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.entity';
import { NotificationsModule } from './common/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'comment_app',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    NotificationsModule,
  ],
})
export class AppModule {}