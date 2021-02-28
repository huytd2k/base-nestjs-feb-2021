import * as bcryptjs from 'bcryptjs';

export class CryptoHelper {
  static genHash(payload: string) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(payload, salt);
  }
  static compareHash(plain: string, hashed: string) {
    return bcryptjs.compareSync(plain, hashed);
  }
}
