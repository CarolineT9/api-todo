import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/exception.filter'; // Certifique-se de que o caminho está correto
@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter, // Certifique-se de que ApiExceptionFilter está importado corretamente
    },
    {
      provide:  "KEY_TOKEN",
      useValue: "token_12456"
    }
    

  ],
})
export class TasksModule {}
