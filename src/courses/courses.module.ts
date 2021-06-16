import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './models/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [],
  providers: [CoursesResolver, CoursesService],
})
export class CoursesModule {}
