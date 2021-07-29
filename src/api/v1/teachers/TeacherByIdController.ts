import { Controller, Get, HttpStatus, Param, ParseUUIDPipe } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { TeacherId } from "../../../transactions/teachers/use-cases/teacher-id";
import { DocumentationTags, Endpoint } from "../../../utils/Endpoint";
import { FindTeacherResponseDTO } from "./dto/teacher.dto";

@Controller()
export class TeacherByIdController{
    constructor(private readonly teacherId: TeacherId){}

    @Endpoint({
        status: HttpStatus.OK,
        type: FindTeacherResponseDTO,
        description: 'Show teacher by id',
        tags: [DocumentationTags.TEACHERS]
    })
    @ApiQuery({
        name: 'teacher id',
        example: '610165f719dba314d653c6e8',
        required: true,
        description: 'Get a teacher'
    })
    @Get('api/v1/teacher/:teacherId')
    async execute(
        @Param('teacherId') teacherID: string
    ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        return await this.teacherId.execute(teacherID);
    }
}