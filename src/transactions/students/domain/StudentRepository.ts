import { HttpStatus } from "@nestjs/common";
import { FindStudentsResponseDTO, StudentDTO } from "../../../api/v1/students/dto/student.dto";

export const STUDENT_REPOSITORY_TOKEN = 'StudentRepositoryToken';

export interface StudentRepository {
    getStudents(): Promise<FindStudentsResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR>;
    getStudentById(studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>;
    createStudent(payload: StudentDTO): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>;
    updateStudent(payload: StudentDTO, studentId: string): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>;
    deleteStudent(studentId: string): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR>;
}