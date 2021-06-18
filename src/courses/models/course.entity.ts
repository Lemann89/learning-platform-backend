import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseCategoryEntity } from './course-category.entity';
import { ModuleEntity } from './module.entity';

@ObjectType()
@Entity('course')
export class CourseEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @OneToOne(() => CourseCategoryEntity)
  @JoinColumn({ name: 'category_id' })
  courseCategory?: CourseCategoryEntity;

  @Field(() => [ModuleEntity])
  @OneToMany(() => ModuleEntity, (module) => module.course)
  modules?: ModuleEntity[];
}
