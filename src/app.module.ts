import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { Card } from './card/entities/card.entity';
import { CardModule } from './card/card.module';
import { OpenAiModule } from './openAi/open.ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [User, Card],
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    AuthModule,
    UserModule,
    CardModule,
    OpenAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
