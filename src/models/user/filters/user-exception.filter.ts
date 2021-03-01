import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { BaseFilter } from 'src/common/base/base.filter';

export class UserExceptionFilter extends BaseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
