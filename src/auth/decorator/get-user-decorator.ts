import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    let request = ctx.switchToHttp().getRequest() as Request;
    const {
      user: { password, ...user },
    }: Request & { user: User } = request as Request & {
      user: User;
    };
    if (data) {
      return user ? user[data] : {};
    }
    return user;
  },
);
