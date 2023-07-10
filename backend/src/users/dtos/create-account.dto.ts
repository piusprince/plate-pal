import { PickType, InputType, ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(
  User,
  ['name', 'email', 'password', 'role'],
  InputType,
) {}

@ObjectType()
export class CreateAccountOutput {
  @Field((type) => String, { nullable: true })
  ok: boolean;
  error?: string;
}
