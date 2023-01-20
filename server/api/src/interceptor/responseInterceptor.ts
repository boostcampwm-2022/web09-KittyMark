import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((response) => {
        let result;

        if (response && response.statusCode && response.message) {
          const { statusCode, message, ...data } = response;
          context.switchToHttp().getResponse().status(statusCode);
          if (statusCode === 300) {
            const { url, ...body } = data;
            result = { statusCode, message, url, data: body };
          } else {
            result = { statusCode, message, data };
          }
        } else if (response && response.statusCode) {
          const { statusCode, ...data } = response;
          context.switchToHttp().getResponse().status(statusCode);
          result = { statusCode, message: 'Success', data };
        } else if (response && response.message) {
          const { message, ...data } = response;
          const statusCode = context.switchToHttp().getResponse().statusCode;
          result = { statusCode, message, data };
        } else {
          const statusCode = context.switchToHttp().getResponse().statusCode;
          result = { statusCode, message: 'Success', data: response };
        }

        return result;
      }),
    );
  }
}
