import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id}`);
    }
    return todo;
  }

  create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async update(id: number, todo: Todo): Promise<void> {
    await this.todoRepository.update(id, todo);
  }

  async updateCompleted(id: number, completed: boolean): Promise<void> {
    await this.todoRepository.update(id, { completed });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
