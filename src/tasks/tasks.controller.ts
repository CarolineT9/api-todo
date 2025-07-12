import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { LoggerInterceptors } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptors } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { AdminGuard } from 'src/common/guards/admin.guards';

@Controller('tasks')
@UseGuards(AdminGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseInterceptors(LoggerInterceptors)
  @UseInterceptors(AddHeaderInterceptor)
  // @UseGuards(AdminGuard)
  findAllTasks(@Query() paginationDto: PaginationDto) {
    return this.tasksService.listAllTasks(paginationDto);
  }
  @Get(':id')
  findOneTask(@Param('id', ParseIntPipe) id: number) {
    console.log('Token teste', process.env.TOKEN_KEY)
    return this.tasksService.findOne(id);
  }

  @Post()
  @UseInterceptors(BodyCreateTaskInterceptors)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }
  @Delete(':id')
  deteteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
