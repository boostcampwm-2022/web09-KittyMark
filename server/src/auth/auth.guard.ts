import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private async validateRequest(request: Request) {
    console.log('req.id', request.sessionID);
    if (
      /^(\/auth)+/g.test(request.path) ||
      (request.path === '/user' && request.method === 'POST') ||
      (request.path === '/user/nameCheck' && request.method === 'GET')
    ) {
      return true;
    }
    if (request.session.userId) {
      return true;
    } else {
      throw new UnauthorizedException('This user is an unauthorized user');
    }
  }
}
