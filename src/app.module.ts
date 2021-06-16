import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
