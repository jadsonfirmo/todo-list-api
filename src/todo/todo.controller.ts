import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { InsertTodoRequest } from './models/insert-todo.request';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.' })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiResponse({ status: 200, description: 'Return a single todo.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({ type: InsertTodoRequest })
  @ApiResponse({ status: 201, description: 'The todo has been created.' })
  create(@Body() todo: Todo) {
    return this.todoService.create(todo);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiBody({ type: Todo })
  @ApiResponse({ status: 200, description: 'The todo has been updated.' })
  update(@Param('id') id: number, @Body() todo: Todo) {
    return this.todoService.update(id, todo);
  }

  @Patch(':id/completed')
  @ApiOperation({ summary: 'Update the completion status of a todo' })
  @ApiBody({ schema: { example: { completed: false } } })
  @ApiResponse({
    status: 200,
    description: 'The completion status has been updated.',
  })
  updateCompleted(
    @Param('id') id: number,
    @Body() completedDto: { completed: boolean },
  ) {
    return this.todoService.updateCompleted(id, completedDto.completed);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo has been deleted.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
