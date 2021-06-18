import { Module } from '@nestjs/common';
import { CoursesService } from './services/courses.service';
import { CoursesResolver } from './resolvers/courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './models/course.entity';
import { ModulesService } from './services/modules.service';
import { ModuleEntity } from './models/module.entity';
import { CourseCategoryEntity } from './models/course-category.entity';
import { LessonEntity } from './models/lesson.entity';
import { ModulesResolver } from './resolvers/modules.resolver';
import { LessonsService } from './services/lessons.service';
import { LessonsResolver } from './resolvers/lessons.resolver';

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
