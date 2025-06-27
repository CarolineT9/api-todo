
import {  Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    console.log(`[REQUEST] ${method} ${url}`);
    
    res.on('finish', () => {
      console.log(`[RESPONSE] ${res.statusCode}`);
    });

    next();
  }
}