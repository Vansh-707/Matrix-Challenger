import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { User } from '../users/models/user.entity'; // Corrected path to 'models' folder

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'comment_app',
  entities: [Comment, User],
  synchronize: true,
  logging: process.env.DB_LOGGING === 'true',
};