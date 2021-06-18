import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonEntity } from '../models/lesson.entity';
import { DeleteResult } from '../dto/delete-result';
import { LessonsService } from '../services/lessons.service';
import { CreateLessonInput } from '../dto/lesson/create-lesson.input';
import { UpdateLessonInput } from '../dto/lesson/update-lesson.input';

@Resolver(() => LessonEntity)
export class LessonsResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Query(() => [LessonEntity], { name: 'lessons' })
  async getAll(): Promise<LessonEntity[]> {
    return this.lessonsService.getAll();
  }

  @Query(() => LessonEntity, { name: 'lesson' })
  async getById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<LessonEntity> {
    return this.lessonsService.getById(id);
  }

  @Mutation(() => LessonEntity)
  async createLesson(
    @Args('lesson') lesson: CreateLessonInput,
  ): Promise<LessonEntity> {
    return this.lessonsService.create(lesson);
  }

  @Mutation(() => LessonEntity)
  async updateLesson(
    @Args('lesson') lesson: UpdateLessonInput,
  ): Promise<LessonEntity> {
    return this.lessonsService.update(lesson);
  }

  @Mutation(() => DeleteResult)
  async deleteLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonsService.delete(id);
  }
}
