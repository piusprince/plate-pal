import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createAccount(data: CreateAccountInput): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      return 'There is a user with that email already';
    }

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        },
      });
      return newUser;
    } catch (error) {
      return 'Could not create user';
    }
  }
}
