import { AccountRepository } from '@auth/infrastructure/repositories/account.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interface/jwt-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private accountRepository: AccountRepository,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: `${
          configService.get('cognito').authority
        }/.well-known/jwks.json`,
        jwksRequestsPerMinute: 5,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('cognito').clientId,
      issuer: configService.get('cognito').authority,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: IJwtPayload) {
    const account = await this.accountRepository.findOneBy({
      username: payload.email,
    });

    if (account === undefined) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
