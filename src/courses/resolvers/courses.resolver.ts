import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseEntity } from '../models/course.entity';
import { CoursesService } from '../services/courses.service';
import { CreateCourseInput } from '../dto/course/create-course.input';
import { UpdateCourseInput } from '../dto/course/update-course.input';
import { DeleteResult } from '../dto/delete-result';
import { ModuleEntity } from '../models/module.entity';

@Resolver(() => CourseEntity)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => CourseEntity, { name: 'course' })
  async getById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CourseEntity> {
    return this.coursesService.getById(id);
  }

  @Query(() => [CourseEntity], { name: 'courses' })
  async getAll(): Promise<CourseEntity[]> {
    return this.coursesService.getAll();
  }

  @Mutation(() => CourseEntity)
  async createCourse(
    @Args('course') course: CreateCourseInput,
  ): Promise<CourseEntity> {
    return this.coursesService.create(course);
  }

  @Mutation(() => CourseEntity)
  async updateCourse(
    @Args('course') course: UpdateCourseInput,
  ): Promise<CourseEntity> {
    return this.coursesService.update(course);
  }

  @Mutation(() => DeleteResult)
  async deleteCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.delete(id);
  }
}
