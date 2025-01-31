import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNo: string;

  @Column()
  nameOnCard: string;

  @Column()
  expireMonth: string;

  @Column()
  expireYear: string;

  @Column()
  cvv: string;
}
