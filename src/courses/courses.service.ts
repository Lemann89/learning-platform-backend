import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEntity } from './models/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
  ) {}

  getAll(): Promise<CourseEntity[]> {
    return this.coursesRepository.find({
      relations: ['courseCategory', 'modules', 'modules.lessons'],
    });
  }

  getById(id: number): Promise<CourseEntity> {
    return this.coursesRepository.findOne(id, {
      relations: ['courseCategory', 'modules', 'modules.lessons'],
    });
  }

  create(course: CreateCourseInput): Promise<CourseEntity> {
    return this.coursesRepository.save(this.coursesRepository.create(course));
  }

  update(id: number, updatedCourse: UpdateCourseInput) {
    const course = this.coursesRepository.create(updatedCourse);
    course.id = id;
    return this.coursesRepository.save(course);
  }

  async delete(id: number) {
    const course = await this.getById(id);
    if (course) {
      const res = await this.coursesRepository.delete(id);
      if (res.affected === 1) {
        return course;
      }
    }
    throw new NotFoundException(`Course cannot find by id ${id}`);
  }
}
