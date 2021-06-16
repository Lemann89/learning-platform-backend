import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseEntity } from './course.entity';
import { LessonEntity } from './lesson.entity';

@ObjectType()
@Entity('module')
export class ModuleEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => Int)
  @Column()
  order: number;

  @Field()
  @Column()
  description: string;

  @Field(() => CourseEntity)
  @ManyToOne(() => CourseEntity, (course) => course.modules)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @Field(() => [LessonEntity])
  @OneToMany(() => LessonEntity, (lesson) => lesson.module)
  lessons: LessonEntity[];
}
