import { Module } from "@nestjs/common";
/*import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "../../../../api/v1/students/models/student.model";*/
import { STUDENT_REPOSITORY_TOKEN } from "../../domain/StudentRepository";
import { StudentRepositoryMemory } from "./StudentRepositoryMemory";
import { StudentRepositoryMikroORM } from "./StudentRepositoryMikroORM";
import { StudentRepositoryMongodb } from "./StudentRepositoryMongodb";

@Module({
    imports: [
      //MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}])
    ],
    providers: [{
        provide: STUDENT_REPOSITORY_TOKEN,
        useClass: StudentRepositoryMikroORM
      }],
      exports: [STUDENT_REPOSITORY_TOKEN]
})

export class StudentRepositoryModule{}