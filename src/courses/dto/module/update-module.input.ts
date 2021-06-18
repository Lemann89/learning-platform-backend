import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateModuleInput {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => Int, { nullable: true })
  order?: number;
}
