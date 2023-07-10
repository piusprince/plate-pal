import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginAccountInput } from './dtos/login-account.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User)
  login(@Args('input') loginAccountInput: LoginAccountInput): Promise<boolean> {
    return this.usersService.login(loginAccountInput);
  }

  @Mutation((returns) => User)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<User> {
    return this.usersService.createAccount(createAccountInput);
  }
}
