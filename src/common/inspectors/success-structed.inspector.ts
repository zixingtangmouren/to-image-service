import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class SuccessStructedInspector implements NestInterceptor {
  intercept(conext: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: unknown) => {
        return {
          code: 0,
          message: 'success',
          data,
        };
      }),
    );
  }
}
