import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}
