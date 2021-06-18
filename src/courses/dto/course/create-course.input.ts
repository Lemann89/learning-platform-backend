import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => Int, { nullable: true })
  courseCategoryId?: number;
}
