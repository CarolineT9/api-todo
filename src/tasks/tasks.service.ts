import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async listAllTasks() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Essa tarefa não existe');
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
        },
      });
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Falha ao criar tarefa');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException('Essa tarefa não existe');
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async delete(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException('Essa tarefa não existe');
    }

    await this.prisma.task.delete({ where: { id } });

    return { message: 'Tarefa excluída com sucesso!' };
  }
}
