import { HttpStatus } from "@nestjs/common";
import { authDTO } from "../../../api/v1/auth/dto/auth.dto";
import { tokenDTO } from "../../../api/v1/auth/dto/token.dto";
import { FindStudentsResponseDTO } from "../../../api/v1/students/dto/student.dto";

export const AUTHENTICATE_REPOSITORY_TOKEN = 'AuthenticateRepositoryToken';

export interface AuthenticateRepository{
    findStudent(user: authDTO): Promise<FindStudentsResponseDTO | undefined>;
}