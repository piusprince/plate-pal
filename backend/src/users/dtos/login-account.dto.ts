import { OmitType, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class LoginAccountInput extends OmitType(
  User,
  ['role', 'name', 'role', 'id'],
  InputType,
) {}

@ObjectType()
export class LoginAccountOutput {
  ok: boolean;
  error?: string;
  token?: string;
}
