import {  MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

// import { AdminGuard } from 'src/common/guards/admin.guards'; // Import the AdminGuard
@Module({
  imports: [TasksModule, UsersModule, ConfigModule.forRoot(), AuthModule ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AdminGuard, // Register the AdminGuard as a global guard
    // }
  
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes({
      path: '*', // Apply to all routes
      method: RequestMethod.ALL, // Apply to all HTTP methods
    }); // Apply the LoggerMiddleware to all routes
      
  }
}
