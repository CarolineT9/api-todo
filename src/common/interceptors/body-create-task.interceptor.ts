import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
@Injectable()
export class BodyCreateTaskInterceptors implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const { method, url, body } = request;
      console.log([`[REQUEST] ${method} ${url}`])
      console.log([`[BODY] ${JSON.stringify(body, null, 2)}`])

      return next.handle();
  }

}