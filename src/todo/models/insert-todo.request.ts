import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from 'class-validator';


export class InsertTodoRequest {
  @IsString()
  @ApiProperty({ description: 'The title of the todo' })
  title: string;

  @IsBoolean()
  @ApiProperty({
    description: 'The completion status of the todo',
    default: false,
  })
  completed?: boolean; // Pode ser opcional, padrão é false
}
