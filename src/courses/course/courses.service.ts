import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEntity } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { CourseCategoryEntity } from '../course_category/course-category.entity';

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

  create(courseInput: CreateCourseInput): Promise<CourseEntity> {
    const newCourse: CourseEntity = {
      ...courseInput,
      courseCategory: null,
    };

    if (courseInput.courseCategoryId) {
      newCourse.courseCategory = {
        id: courseInput.courseCategoryId,
      } as CourseCategoryEntity;
    }

    return this.coursesRepository.save(
      this.coursesRepository.create(newCourse),
    );
  }

  update(updateCourseInput: UpdateCourseInput) {
    const updatedCourse = this.coursesRepository.create(updateCourseInput);
    updatedCourse.id = updateCourseInput.id;
    return this.coursesRepository.save(updatedCourse);
  }

  async delete(id: number) {
    const res = await this.coursesRepository.delete(id);
    if (res.affected === 1) {
      return res;
    }
    throw new NotFoundException(`Course cannot find by id ${id}`);
  }
}
