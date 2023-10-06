import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @IsNotEmpty()
  title: string;
  
  @Column()
  @IsNotEmpty()
  author: string;
  
  @Column()
  @IsNotEmpty()
  genre: string;
  
  @Column()
  @IsNotEmpty()
  amount: number;
  
  @Column()
  @IsNotEmpty()
  publication_date: Date;
  
  @Column()
  @IsNotEmpty()
  isbn: string;
  
  @Column()
  @IsNotEmpty()
  publisher: string;
  
  @Column()
  @IsNotEmpty()
  pages: number;
  
  @Column()
  @IsNotEmpty()
  synopsis: string;
}