import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountInput } from './dtos/create-account.dto';
import * as bcrypt from 'bcrypt';

import {
  LoginAccountInput,
  LoginAccountOutput,
} from './dtos/login-account.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async createAccount(data: CreateAccountInput): Promise<any> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('There is a user with that email already');
    }

    const hashedPassword = await this.hashedData(data.password);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: data.role,
        },
      });
      return newUser;
    } catch (error) {
      return { ok: false, error: 'Could not create account' };
    }
  }

  async login(data: LoginAccountInput): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied!. This user does not exist');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Access Denied!. Wrong password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    console.log(accessToken);

    return { accessToken };
  }

  hashedData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
}
