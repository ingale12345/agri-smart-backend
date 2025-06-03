import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRETE') || '',
    });
  }
  async validate(payload: { sub: string; email: string }) {
    // Logger.log('in vvalidatealidate function payload is', { payload });
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    // delete user?.hash
    Logger.log('user is', user);
    return user;
    // throw new Error('Method not implemented.');
  }
}
