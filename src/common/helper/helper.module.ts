import { Global, Module } from '@nestjs/common';
import { CryptoHelper } from './crypto.helper';
import { ErrorHelper } from './errors.helper';
import { TokenHelper } from './token.helper';
import { ValidateHelper } from './validate.helper';

@Global()
@Module({
  providers: [CryptoHelper, ErrorHelper, TokenHelper, ValidateHelper],
  exports: [CryptoHelper, ErrorHelper, TokenHelper, ValidateHelper],
})
export class HelperModule {}
