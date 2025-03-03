import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    this.logger.debug('auth middleware checking use nest middleware');
    const authType = req.headers['authorization'];
    if (!authType || authType !== 'Bearer') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const value = authType.split(' ')[1];

    if (!value || value === '') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      this.logger.debug('try verify jwt token');
      const decode = await this.jwtService.verifyAsync(value);

      const sub = decode.sub;
    } catch (e) {
      this.logger.warn(`verify jwt token invalid ${e}`);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
