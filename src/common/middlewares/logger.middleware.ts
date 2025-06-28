import { User } from './../../../generated/prisma/index.d';

import {  Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        token: authorization,
       // This should be replaced with actual user name extraction logic
        // This should be replaced with actual user ID extraction logic
    } 
    next();
  }}}
