import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
