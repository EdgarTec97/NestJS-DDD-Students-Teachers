import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FindStudentsResponseDTO } from "../../../../api/v1/students/dto/student.dto";
import { Student, StudentDocument } from "../../../../api/v1/students/models/student.model";
import { StudentsPerTeacherRepository } from "../../domain/StudentsPerTeacherRepository";

@Injectable()
export class StudentsPerTeacherRepositoryMongodb implements StudentsPerTeacherRepository {
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>
    ){}
    async changeStudentsPerTeacherRepository(studentId: string, teacherId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const updatedStudent = await this.studentModel.findByIdAndUpdate(studentId, {teacherId: teacherId}, {new:true});
            return updatedStudent;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}