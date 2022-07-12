import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const { username, password } = req.body as UpdateUserDto;
    if (!username && !password) {
      throw new BadRequestException('For update an user is needed some user field');
    }
    next();
  }
}
