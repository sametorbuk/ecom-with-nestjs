import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';

export interface CardRepository extends Repository<Card> {
  this: Repository<Card>;
  getCards(): Promise<Card>;
}

export const customCardRepository: Pick<CardRepository, any> = {
  getCards(this: Repository<Card>): Promise<Card[]> {
    return this.find();
  },
};
