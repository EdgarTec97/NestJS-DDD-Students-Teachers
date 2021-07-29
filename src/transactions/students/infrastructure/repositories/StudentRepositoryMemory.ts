import { HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { FindStudentsResponseDTO, StudentDTO } from "../../../../api/v1/students/dto/student.dto";
import { StudentRepository } from "../../domain/StudentRepository";
import { students } from "src/db";

@Injectable()
export class StudentRepositoryMemory implements StudentRepository{
    private students = students;
    
    async getStudents(): Promise<FindStudentsResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            return await this.students;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async getStudentById(studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            return await this.students.find(student => student.id === studentId);
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    
    async createStudent(payload: StudentDTO): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            let newStudent = {
                id: uuid(),
                ...payload
            }
            await this.students.push(newStudent);
            return newStudent;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async updateStudent(payload: StudentDTO, studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            let updatedStudent: FindStudentsResponseDTO;
            const updatedStudentList = await this.students.map(student => {
                if(student.id == studentId){
                    updatedStudent = {
                        id: studentId,
                        ...payload
                    }
                    return updatedStudent;
                }else{
                    return student;
                }
            });
            this.students = updatedStudentList;
            return updatedStudent;
        } catch (error) {
            console.log(error);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async deleteStudent(studentId: string): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR> {
        try {
            let i = 0;
            this.students.forEach( (item, index) => {
                if(item.id === studentId){
                    this.students.splice(index,1);
                    i++;
                }
            });
            if(i == 0){
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