import { Module } from "@nestjs/common";
import { StudentsPerTeacherController } from "../../api/v1/studentsPerTeacher/StudentsPerTeacherController";
import { StudentsPerTeacherRepositoryModule } from "./infrastructure/repositories/students-per-teacher-repository.module";
import { StudentsPerTeacher } from "./use-cases/Students-per-teacher";

@Module({
    imports: [StudentsPerTeacherRepositoryModule],
    controllers: [StudentsPerTeacherController],
    providers: [StudentsPerTeacher],
    exports: [StudentsPerTeacher]
})
export class StudentsPerTeacherModule{}