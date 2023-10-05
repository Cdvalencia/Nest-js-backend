import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;
  
  @Column()
  amount: number;
  
  @Column()
  publication_date: Date;
  
  @Column()
  isbn: string;
  
  @Column()
  publisher: string;
  
  @Column()
  pages: number;
  
  @Column()
  synopsis: string;
}