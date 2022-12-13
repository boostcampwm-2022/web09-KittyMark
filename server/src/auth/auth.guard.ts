import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly RedisClient: RedisClientType<
      RedisModules,
      RedisFunctions,
      RedisScripts
    >,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private async validateRequest(request: Request) {
    if (
      /^(\/auth)+/g.test(request.path) ||
      (request.path === '/user' && request.method === 'POST') ||
      (request.path === '/user/nameCheck' && request.method === 'GET')
    ) {
      return true;
    }

    const result = await this.RedisClient.get(request.sessionID);
    if (result && parseInt(result) === request.session.userId) {
      return true;
    } else {
      throw new UnauthorizedException('This user is an unauthorized user');
    }
  }
}
