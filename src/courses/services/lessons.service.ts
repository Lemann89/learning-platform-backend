import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from '../models/lesson.entity';
import { ModuleEntity } from '../models/module.entity';
import { CreateLessonInput } from '../dto/lesson/create-lesson.input';
import { UpdateLessonInput } from '../dto/lesson/update-lesson.input';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  getAll(): Promise<LessonEntity[]> {
    return this.lessonRepository.find({ relations: ['module'] });
  }

  getById(id: number) {
    return this.lessonRepository.findOne({ id }, { relations: ['module'] });
  }

  create(createLessonInput: CreateLessonInput) {
    const newLesson: LessonEntity = {
      ...createLessonInput,
      module: {
        id: createLessonInput.moduleId,
      } as ModuleEntity,
    };

    return this.lessonRepository.save(this.lessonRepository.create(newLesson));
  }

  update(updateLessonInput: UpdateLessonInput) {
    const updatedLesson = this.lessonRepository.create(updateLessonInput);
    updatedLesson.id = updateLessonInput.id;
    return this.lessonRepository.save(updatedLesson);
  }

  async delete(id: number) {
    const deleteResult = await this.lessonRepository.delete(id);
    if (deleteResult.affected === 1) {
      return deleteResult;
    }
    throw new NotFoundException(`Course cannot find by id ${id}`);
  }
}
