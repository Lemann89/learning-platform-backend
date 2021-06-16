import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleEntity } from './module.entity';

@ObjectType()
@Entity('lesson')
export class LessonEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column()
  order: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  content: string;

  @Field(() => ModuleEntity)
  @ManyToOne(() => ModuleEntity, (module) => module.lessons)
  @JoinColumn({ name: 'module_id' })
  module: ModuleEntity;
}
