import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: AuthDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new ForbiddenException('credentials incorrect');
    }

    //compare passwords
    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('credentials incorrect');
    }
    const { password, ...rest } = user;
    return { ...(await this.signToken(user.id, user.email)), user: rest };
  }
  async signup(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);

    try {
      const { password, ...user } = await this.prisma.user.create({
        data: { ...dto, password: hash },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          Logger.log(error);
          throw new ForbiddenException('credentials taken.');
        }
      }
      throw error;
    }
  }
  async signToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRETE');
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return { accessToken };
  }
}
