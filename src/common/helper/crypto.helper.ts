import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class CryptoHelper {
  genHash(payload: string) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(payload, salt);
  }
  compareHash(plain: string, hashed: string) {
    return bcryptjs.compareSync(plain, hashed);
  }
}
