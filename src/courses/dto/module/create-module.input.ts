import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateModuleInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => Int, { nullable: true })
  order?: number;

  @Field((type) => Int)
  courseId: number;
}
