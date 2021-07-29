import { Module } from "@nestjs/common";
/*import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "../../../../api/v1/students/models/student.model";*/
import { STUDENTS_PER_TEACHER_REPOSITORY_TOKEN } from "../../domain/StudentsPerTeacherRepository";
import { StudentsPerTeacherRepositoryMemory } from "./StudentsPerTeacherRepositoryMemory";
import { StudentsPerTeacherRepositoryMikroORM } from "./StudentsPerTeacherRepositoryMikroORM";
import { StudentsPerTeacherRepositoryMongodb } from "./StudentsPerTeacherRepositoryMongodb";

@Module({
    imports: [
        //MongooseModule.forFeature([{name: Student.name, schema:StudentSchema}])
    ],
    providers: [{
        provide: STUDENTS_PER_TEACHER_REPOSITORY_TOKEN,
        useClass: StudentsPerTeacherRepositoryMikroORM
    }],
    exports: [STUDENTS_PER_TEACHER_REPOSITORY_TOKEN]
})
export class StudentsPerTeacherRepositoryModule{}