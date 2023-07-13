import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsString, IsNumber, IsEmail, IsEnum } from 'class-validator';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
export class User {
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @Field((type) => String, {
    nullable: false,
  })
  @IsString()
  name: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @IsString()
  password: string;

  @Field((type) => String, {
    defaultValue: 'Client',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
