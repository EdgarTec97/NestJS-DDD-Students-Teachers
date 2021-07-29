import { MikroORM } from "@mikro-orm/core";
import { MongoConnection, MongoDriver, ObjectId } from "@mikro-orm/mongodb";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FindStudentsResponseDTO } from "../../../../api/v1/students/dto/student.dto";
import { FindTeacherResponseDTO, TeacherDTO } from "../../../../api/v1/teachers/dto/teacher.dto";
import { MIKRO_ORM_MONGODB_TOKEN } from "../../../../utils/mikro-orm-switcher.module";
import { TeacherRepository } from "../../domain/TeacherRepository";

@Injectable()
export class TeacherRepositoryMikroORM implements TeacherRepository{
    private connection: MongoConnection;
    constructor(
        @Inject(MIKRO_ORM_MONGODB_TOKEN) private readonly orm: MikroORM<MongoDriver>
    ){
        this.connection = this.orm.em.getDriver().getConnection();
    }

    async getTeachers(): Promise<FindTeacherResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            const result = (await this.connection.find('teachers',{}) as FindStudentsResponseDTO[]);
            return result;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async getTeacherById(teacherId: string): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            const result = await this.connection.getCollection('teachers').findOne(new ObjectId(teacherId));
            return result;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async createTeacher(payload: TeacherDTO): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            const result = await this.connection.insertOne('teachers',{_id: null, ...payload});
            return (result['row'] as FindTeacherResponseDTO);
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async updateTeacher(payload: TeacherDTO, teacherId: string): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            await this.connection.deleteMany('teachers',{_id: new ObjectId(teacherId)});
            const result = await this.connection.insertOne('teachers',{_id: new ObjectId(teacherId), ...payload});
            return (result['row'] as FindTeacherResponseDTO);
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    async deleteTeacher(teacherId: string): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR>{
        try {
            const result = await this.connection.deleteMany('teachers',{_id: new ObjectId(teacherId)});
            if(result['affectedRows'] == 0){
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