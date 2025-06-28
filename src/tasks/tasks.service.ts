import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async listAllTasks(paginationDto?: PaginationDto) {
    const limit = paginationDto?.limit ?? 10;
    const offset = paginationDto?.offset ?? 0;

    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      return await this.prisma.task.create({
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          completed: false,
          userId: createTaskDto.userId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('Falha ao criar tarefa', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        name: updateTaskDto?.name ?? task.name,
        description: updateTaskDto?.description ?? task.description,
        completed: updateTaskDto?.completed ?? task.completed,
      },
    });
  }

  async delete(id: number) {
    const findTask = await this.prisma.task.findFirst({
      where: { id },
    });

    if (!findTask) {
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    }

    await this.prisma.task.delete({
      where: { id: findTask.id },
    });

    return {
      message: 'Tarefa excluída com sucesso!',
    };
  }
}
