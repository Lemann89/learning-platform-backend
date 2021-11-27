import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModuleEntity } from './module.entity';
import { ModulesService } from './modules.service';
import { CreateModuleInput } from './dto/create-module.input';
import { UpdateModuleInput } from './dto/update-module.input';
import { DeleteResult } from '../dto/delete-result';

@Resolver(() => ModuleEntity)
export class ModulesResolver {
  constructor(private readonly modulesService: ModulesService) {}

  @Query(() => [ModuleEntity], { name: 'modules' })
  async getAll(): Promise<ModuleEntity[]> {
    return this.modulesService.getAll();
  }

  @Query(() => ModuleEntity, { name: 'module' })
  async getById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ModuleEntity> {
    return this.modulesService.getById(id);
  }

  @Mutation(() => ModuleEntity)
  async createModule(
    @Args('module') module: CreateModuleInput,
  ): Promise<ModuleEntity> {
    return this.modulesService.create(module);
  }

  @Mutation(() => ModuleEntity)
  async updateModule(
    @Args('module') module: UpdateModuleInput,
  ): Promise<ModuleEntity> {
    return this.modulesService.update(module);
  }

  @Mutation(() => DeleteResult)
  async deleteModule(@Args('id', { type: () => Int }) id: number) {
    return this.modulesService.delete(id);
  }
}
