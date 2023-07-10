import { Field, ObjectType } from '@nestjs/graphql';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

@ObjectType()
export class User {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  role: UserRole;
}
