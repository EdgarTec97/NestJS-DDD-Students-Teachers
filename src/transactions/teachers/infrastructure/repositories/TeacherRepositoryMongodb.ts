import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FindTeacherResponseDTO, TeacherDTO } from "../../../../api/v1/teachers/dto/teacher.dto";
import { Teacher, TeacherDocument } from "../../../../api/v1/teachers/models/teacher.model";
import { TeacherRepository } from "../../domain/TeacherRepository";

@Injectable()
export class TeacherRepositoryMongodb implements TeacherRepository{
    constructor(
        @InjectModel(Teacher.name) private readonly teacherModel: Model<TeacherDocument>
    ){}

    async getTeachers(): Promise<FindTeacherResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            return await this.teacherModel.find();
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async getTeacherById(teacherId: string): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            return await this.teacherModel.findById(teacherId);
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async createTeacher(payload: TeacherDTO): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            const newTeacher = new this.teacherModel(payload);
            return await newTeacher.save();
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async updateTeacher(payload: TeacherDTO, teacherId: string): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            const updatedTeacher = await this.teacherModel.findByIdAndUpdate(teacherId,payload,{new:true});
            return updatedTeacher;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async deleteTeacher(teacherId: string): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            const teacherDeleted = await this.teacherModel.findByIdAndDelete(teacherId);
            if(teacherDeleted === null){
                return 'No se eliminó ningun profesor';
            }else{
                return 'Se eliminó con exito el profesor';
            }
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

}