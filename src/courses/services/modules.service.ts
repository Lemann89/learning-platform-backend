import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from '../models/module.entity';
import { Repository } from 'typeorm';
import { CourseEntity } from '../models/course.entity';
import { UpdateModuleInput } from '../dto/module/update-module.input';
import { CreateModuleInput } from '../dto/module/create-module.input';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
  ) {}

  getAll(): Promise<ModuleEntity[]> {
    return this.moduleRepository.find({ relations: ['lessons', 'course'] });
  }

  getById(id: number) {
    return this.moduleRepository.findOne(
      { id },
      { relations: ['lessons', 'course'] },
    );
  }

  create(createModuleInput: CreateModuleInput) {
    const newModule: ModuleEntity = {
      ...createModuleInput,
      course: {
        id: createModuleInput.courseId,
      } as CourseEntity,
    };

    return this.moduleRepository.save(this.moduleRepository.create(newModule));
  }

  update(updateModuleInput: UpdateModuleInput) {
    const updatedModule = this.moduleRepository.create(updateModuleInput);
    updatedModule.id = updateModuleInput.id;
    return this.moduleRepository.save(updatedModule);
  }

  async delete(id: number) {
    const res = await this.moduleRepository.delete(id);
    if (res.affected === 1) {
      return res;
    }
    throw new NotFoundException(`Course cannot find by id ${id}`);
  }
}
