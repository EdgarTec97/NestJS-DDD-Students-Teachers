import { MikroORM } from "@mikro-orm/core";
import { MongoConnection, MongoDriver, ObjectId } from "@mikro-orm/mongodb";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { FindStudentsResponseDTO, StudentDTO } from "../../../../api/v1/students/dto/student.dto";
import { MIKRO_ORM_MONGODB_TOKEN } from "../../../../utils/mikro-orm-switcher.module";
import { StudentRepository } from "../../domain/StudentRepository";

@Injectable()
export class StudentRepositoryMikroORM implements StudentRepository{
    private connection: MongoConnection;

    constructor(@Inject(MIKRO_ORM_MONGODB_TOKEN) private readonly orm: MikroORM<MongoDriver>){
        this.connection = this.orm.em.getDriver().getConnection();
    }
    async getStudents(): Promise<FindStudentsResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const result = (await this.connection.find('students',{}) as FindStudentsResponseDTO[]);
            return result;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async getStudentById(studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const result = await this.connection.getCollection('students').findOne(new ObjectId(studentId));
            return result;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    
    async createStudent(payload: StudentDTO): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const {email,password} = payload;
            const user = await this.connection.getCollection('students').findOne({email});
            if(user){
                throw new HttpException('User Already exist',HttpStatus.BAD_REQUEST);
            }
            payload.password = await bcrypt.hash(password, 10);
            const result = await this.connection.insertOne('students',{ _id: null, ...payload});
            return (result['row'] as FindStudentsResponseDTO);
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async updateStudent(payload: StudentDTO, studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR | any> {
        try {
            if(payload.password && payload.password !== ''){
                const {password} = payload;
                payload.password = await bcrypt.hash(password, 10);
            }
            if(payload.email && payload.email !== ''){
                const {email} = payload;
                const user = await this.connection.getCollection('students').findOne({email});
                if(user){
                    throw new HttpException('User Already exist',HttpStatus.BAD_REQUEST);
                }
            }
            const result = await this.connection.getCollection('students').findOneAndUpdate(
                { _id: new ObjectId(studentId) }, 
                { $set: { ...payload } },
                { returnOriginal: false }
            );
            return result['value'];
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async deleteStudent(studentId: string): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            const studentDelete = await this.connection.deleteMany('students',{_id:new ObjectId(studentId)});
            if(studentDelete['affectedRows'] == 0){
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