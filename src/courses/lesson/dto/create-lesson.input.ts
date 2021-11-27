import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLessonInput {
  @Field()
  name: string;

  @Field()
  content: string;

  @Field((type) => Int, { nullable: true })
  order?: number;

  @Field((type) => Int)
  moduleId: number;
}
