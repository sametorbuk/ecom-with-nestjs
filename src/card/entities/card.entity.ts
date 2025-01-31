import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}
