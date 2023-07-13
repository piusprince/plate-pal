import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class LoginAccountInput extends PickType(
  User,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class LoginAccountOutput {
  ok: boolean;
  error?: string;
  @Field((type) => String, { nullable: true })
  accessToken?: string;
}
