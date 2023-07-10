import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  owner: string;

  @Field((type) => String)
  category: string;
}
