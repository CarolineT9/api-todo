import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAllTasks() {
    return this.tasksService.listAllTasks();
  }
  @Get(":id")
  findOneTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto){
   return this.tasksService.create(createTaskDto)

  }
  @Patch(":id")
  updateTask(@Param("id", ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto){
     return this.tasksService.update(id, updateTaskDto)

  }
  @Delete(":id")
  deteteTask(@Param("id", ParseIntPipe) id: number){
    return this.tasksService.delete(id)
  }
}
