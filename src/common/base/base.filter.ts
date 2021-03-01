import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { HeaderValueEnum } from '../enums/header-value.enum';
import { HeaderEnum } from '../enums/header.enum';
import { ValidationException } from '../exceptions/ValidationException';

export class BaseFilter implements ExceptionFilter {
  protected _sendResponse(response: Response, exception: HttpException) {
    response.status(exception.getStatus());
    response.json(exception.getResponse());
  }

  protected _handleValidationFailedRequest(
    response: Response,
    exception: HttpException,
  ): void {
    response.setHeader(
      HeaderEnum.STATUS_REASON,
      HeaderValueEnum.VALIDATION_FAILED,
    );
    this._sendResponse(response, exception);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof ValidationException)
      this._handleValidationFailedRequest(response, exception);
  }
}
