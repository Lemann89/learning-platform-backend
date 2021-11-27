import { Module } from '@nestjs/common';
import { CoursesService } from './course/courses.service';
import { CoursesResolver } from './course/courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course/course.entity';
import { ModulesService } from './module/modules.service';
import { ModuleEntity } from './module/module.entity';
import { CourseCategoryEntity } from './course_category/course-category.entity';
import { LessonEntity } from './lesson/lesson.entity';
import { ModulesResolver } from './module/modules.resolver';
import { LessonsService } from './lesson/lessons.service';
import { LessonsResolver } from './lesson/lessons.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      ModuleEntity,
      CourseCategoryEntity,
      LessonEntity,
    ]),
  ],
  controllers: [],
  providers: [
    CoursesResolver,
    ModulesResolver,
    LessonsResolver,
    CoursesService,
    ModulesService,
    LessonsService,
  ],
})
export class CoursesModule {}
