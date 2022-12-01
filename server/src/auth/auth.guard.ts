import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { redisClient } from '../utils/redis';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private async validateRequest(request: Request) {
    if (/\/auth+/g.test(request.path)) {
      return true;
    }

    if (!request.sessionID) {
      throw new UnauthorizedException('This user is an unauthorized user');
    } else {
      const result = await redisClient.get(request.sessionID);
      if (result && result === request.session.userEmail) {
        return true;
      } else {
        throw new UnauthorizedException('This user is an unauthorized user');
      }
    }
  }
}
