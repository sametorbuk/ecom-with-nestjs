import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  user: User;
}
