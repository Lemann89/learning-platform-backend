import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseEntity } from './models/course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

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
  async getAll() {
    return this.coursesService.getAll();
  }

  @Mutation(() => CourseEntity)
  async createCourse(@Args('course') course: CreateCourseInput) {
    return this.coursesService.create(course);
  }

  @Mutation(() => CourseEntity)
  async updateCourse(@Args('course') course: UpdateCourseInput) {
    return this.coursesService.update(course.id, course);
  }

  @Mutation(() => CourseEntity)
  async deleteCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.delete(id);
  }
}
