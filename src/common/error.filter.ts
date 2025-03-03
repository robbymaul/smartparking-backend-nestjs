import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        status: exception.getStatus(),
        error: exception.getResponse(),
      });

      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: exception.getStatus(),
      error: exception.getResponse(),
    });
  }
}
