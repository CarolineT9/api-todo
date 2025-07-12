
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const resquest = context.switchToHttp().getRequest();
    console.log('-----------------')
    console.log(resquest['user']);
    console.log('-----------------')

    if(resquest['user']?.role === 'admin') return true;


    // If not an admin, deny access
    return false; // or false, depending on your access control logic
  }
}