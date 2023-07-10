import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountInput } from './dtos/create-account.dto';
import * as bcrypt from 'bcrypt';

import { LoginAccountInput } from './dtos/login-account.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
    console.log('user', user);
    return user;
  }

  hashedData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
}
