import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { Card } from './entities/card.entity';
import { CardController } from './controller/card.controller';
import { customCardRepository } from './repository/card.repository';
import { CardService } from './service/card.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardController],
  providers: [
    {
      provide: getRepositoryToken(Card),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(Card).extend(customCardRepository);
      },
    },
    CardService,
  ],
  exports: [CardService, getRepositoryToken(Card)],
})
export class CardModule {}
