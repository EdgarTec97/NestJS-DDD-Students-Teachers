import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { FindStudentsResponseDTO, StudentDTO } from "../../../../api/v1/students/dto/student.dto";
import { Student, StudentDocument } from "../../../../api/v1/students/models/student.model";
import { StudentRepository } from "../../domain/StudentRepository";

@Injectable()
export class StudentRepositoryMongodb implements StudentRepository{
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>
    ){}

    async getStudents(): Promise<FindStudentsResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            return await this.studentModel.find();
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async getStudentById(studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            return await this.studentModel.findById(studentId);
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    
    async createStudent(payload: StudentDTO): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const {email,password} = payload;
            const user = await this.studentModel.find({email});
            if(user){
                throw new HttpException('User Already exist',HttpStatus.BAD_REQUEST);
            }
            payload.password = await bcrypt.hash(password, 10);
            const newStudent = new this.studentModel(payload);
            return await newStudent.save();
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async updateStudent(payload: StudentDTO, studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            if(payload.password && payload.password !== ''){
                const {password} = payload;
                payload.password = await bcrypt.hash(password, 10);
            }
            if(payload.email && payload.email !== ''){
                const {email} = payload;
                const user = await this.studentModel.find({email});
                if(user){
                    throw new HttpException('User Already exist',HttpStatus.BAD_REQUEST);
                }
            }
            const updatedStudent = await this.studentModel.findByIdAndUpdate(studentId,payload,{new:true});
            return updatedStudent;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async deleteStudent(studentId: string): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const studentDelete = await this.studentModel.findByIdAndDelete(studentId);
            if(studentDelete === null){
                return 'No se eliminó ningun estudiante';
            }else{
                return 'Se eliminó con exito el estudiante';
            }
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

}