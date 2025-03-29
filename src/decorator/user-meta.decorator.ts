import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserMetaI {
  user_id: Uuid;
}

export function UserMeta() {
  return createParamDecorator((_: unknown, ctx: ExecutionContext): { user_id: Uuid } => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['user_id'];

    return {
      user_id: userId,
    };
  })();
}
