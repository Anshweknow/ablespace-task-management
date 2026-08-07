import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
  create(userId: string, dto: CreateTaskDto) {
    return this.tasksRepository.create(userId, dto);
  }
  findAll(userId: string, query: TaskQueryDto) {
    return this.tasksRepository.findMany(userId, query);
  }
  async findOne(userId: string, id: string) {
    const task = await this.tasksRepository.findById(userId, id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
  async update(userId: string, id: string, dto: UpdateTaskDto) {
    await this.findOne(userId, id);
    return this.tasksRepository.update(userId, id, dto);
  }
  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.tasksRepository.delete(userId, id);
    return { message: 'Task deleted' };
  }
  async markComplete(userId: string, id: string) {
    return this.update(userId, id, { status: TaskStatus.COMPLETED });
  }
  async markPending(userId: string, id: string) {
    return this.update(userId, id, { status: TaskStatus.PENDING });
  }
  async duplicate(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.tasksRepository.duplicate(userId, id);
  }
  stats(userId: string) {
    return this.tasksRepository.stats(userId);
  }
}
