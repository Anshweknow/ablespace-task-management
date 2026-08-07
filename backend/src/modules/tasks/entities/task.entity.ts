import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@prisma/client';
export class TaskEntity {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiProperty({ enum: TaskStatus }) status: TaskStatus;
  @ApiProperty({ enum: TaskPriority }) priority: TaskPriority;
  @ApiPropertyOptional() dueDate?: Date | null;
  @ApiPropertyOptional() category?: string | null;
  @ApiProperty() userId: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
export class TaskStatsEntity {
  @ApiProperty() total: number;
  @ApiProperty() completed: number;
  @ApiProperty() pending: number;
  @ApiProperty() highPriority: number;
  @ApiProperty() upcoming: number;
  @ApiProperty({ type: [TaskEntity] }) recent: TaskEntity[];
}
