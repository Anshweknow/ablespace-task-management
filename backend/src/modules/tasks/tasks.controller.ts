import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity, TaskStatsEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.id, dto);
  }

  @Get()
  @ApiOkResponse({ type: [TaskEntity] })
  findAll(@CurrentUser() user: { id: string }, @Query() query: TaskQueryDto) {
    return this.tasksService.findAll(user.id, query);
  }

  @Get('stats')
  @ApiOkResponse({ type: TaskStatsEntity })
  stats(@CurrentUser() user: { id: string }) {
    return this.tasksService.stats(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskEntity })
  findOne(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.tasksService.findOne(user.id, id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskEntity })
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(user.id, id, dto);
  }

  @Patch(':id/complete')
  @ApiOkResponse({ type: TaskEntity })
  markComplete(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.tasksService.markComplete(user.id, id);
  }

  @Patch(':id/pending')
  @ApiOkResponse({ type: TaskEntity })
  markPending(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.tasksService.markPending(user.id, id);
  }

  @Post(':id/duplicate')
  @ApiCreatedResponse({ type: TaskEntity })
  duplicate(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.tasksService.duplicate(user.id, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.tasksService.remove(user.id, id);
  }
}
