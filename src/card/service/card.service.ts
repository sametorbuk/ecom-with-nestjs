import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { CardRepository } from '../repository/card.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: CardRepository,
  ) {}
}
