import { MikroORM } from "@mikro-orm/core";
import { MongoConnection, MongoDriver, ObjectId } from "@mikro-orm/mongodb";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FindStudentsResponseDTO } from "../../../../api/v1/students/dto/student.dto";
import { MIKRO_ORM_MONGODB_TOKEN } from "../../../../utils/mikro-orm-switcher.module";
import { StudentsPerTeacherRepository } from "../../domain/StudentsPerTeacherRepository";

@Injectable()
export class StudentsPerTeacherRepositoryMikroORM implements StudentsPerTeacherRepository{
    private connection: MongoConnection;
    constructor(
        @Inject(MIKRO_ORM_MONGODB_TOKEN) private readonly orm: MikroORM<MongoDriver>
    ){
        this.connection = this.orm.em.getDriver().getConnection();
    }
    async changeStudentsPerTeacherRepository(studentId: string, teacherId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const updatedStudent = await this.connection.getCollection('students').findOneAndUpdate(
                {_id: new ObjectId(studentId)},
                { $set: {teacherId: teacherId}},
                { returnOriginal: false }
            );
            return (updatedStudent['value'] as FindStudentsResponseDTO);
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

}