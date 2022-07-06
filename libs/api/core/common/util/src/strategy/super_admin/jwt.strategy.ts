import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JWTPayload, MyRequest } from '@ustagil/api/core/common/typing';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class SuperAdminJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: JWTPayload) {
    const reqUser: MyRequest['user'] = {
      id: payload.sub,
      role: payload.role,
    };
    return reqUser;
  }
}
