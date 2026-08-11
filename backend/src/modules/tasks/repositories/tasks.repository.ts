import { Injectable } from '@nestjs/common';
import { Prisma, TaskPriority, TaskStatus } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskQueryDto } from '../dto/task-query.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: this.mapCreatePayload(userId, dto),
    });
  }

  findMany(userId: string, query: TaskQueryDto) {
    return this.prisma.task.findMany({
      where: this.buildWhere(userId, query),
      orderBy: this.buildOrderBy(query),
    });
  }

  findById(userId: string, id: string) {
    return this.prisma.task.findFirst({ where: { id, userId } });
  }

  update(userId: string, id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: this.mapUpdatePayload(dto),
    });
  }

  delete(userId: string, id: string) {
    return this.prisma.task.delete({ where: { id } });
  }

  duplicate(userId: string, id: string) {
    return this.prisma.$transaction(async (tx) => {
      const task = await tx.task.findFirstOrThrow({ where: { id, userId } });
      return tx.task.create({
        data: {
          title: `${task.title} (Copy)`,
          description: task.description,
          status: TaskStatus.PENDING,
          priority: task.priority,
          dueDate: task.dueDate,
          category: task.category,
          userId,
        },
      });
    });
  }

  async stats(userId: string) {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    const [total, completed, pending, highPriority, upcoming, recent] =
      await Promise.all([
        this.prisma.task.count({ where: { userId } }),
        this.prisma.task.count({
          where: { userId, status: TaskStatus.COMPLETED },
        }),
        this.prisma.task.count({
          where: { userId, status: TaskStatus.PENDING },
        }),
        this.prisma.task.count({
          where: { userId, priority: TaskPriority.HIGH },
        }),
        this.prisma.task.count({
          where: { userId, dueDate: { gte: now, lte: nextWeek } },
        }),
        this.prisma.task.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
      ]);
    return { total, completed, pending, highPriority, upcoming, recent };
  }

  private buildWhere(
    userId: string,
    query: TaskQueryDto,
  ): Prisma.TaskWhereInput {
    const where: Prisma.TaskWhereInput = { userId };
    if (query.status) where.status = query.status;
    if (query.priority) where.priority = query.priority;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { category: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  private buildOrderBy(
    query: TaskQueryDto,
  ): Prisma.TaskOrderByWithRelationInput {
    const direction = query.sortOrder ?? 'desc';
    return query.sortBy === 'dueDate'
      ? { dueDate: direction }
      : { createdAt: direction };
  }

  private mapCreatePayload(
    userId: string,
    dto: CreateTaskDto,
  ): Prisma.TaskUncheckedCreateInput {
    return {
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      userId,
    };
  }

  private mapUpdatePayload(
    dto: UpdateTaskDto,
  ): Prisma.TaskUncheckedUpdateInput {
    return {
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    };
  }
}
