import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptors implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.ulr;
    const now = Date.now();

    console.log(`[REQUEST] ${method} ${url} - Início da req`)
      return next.handle().pipe(
        tap(() =>{
          console.log(`[RESPONSE] ${method} ${url} - ${Date.now() - now } ms`)
        })
      );


  }
}