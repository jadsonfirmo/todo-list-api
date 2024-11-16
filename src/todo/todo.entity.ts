import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the todo' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The title of the todo' })
  title: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'The completion status of the todo',
    default: false,
  })
  completed: boolean;
}
