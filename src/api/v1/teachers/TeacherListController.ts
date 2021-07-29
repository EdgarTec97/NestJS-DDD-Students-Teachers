import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { TeacherList } from "../../../transactions/teachers/use-cases/teacher-list";
import { DocumentationTags, Endpoint } from "../../../utils/Endpoint";
import { FindTeacherResponseDTO } from "./dto/teacher.dto";

@Controller()
export class TeacherListController{
    constructor(private readonly teacherList: TeacherList){}

    @Endpoint({
        status: HttpStatus.OK,
        type: FindTeacherResponseDTO,
        isArray: true,
        description: 'List teachers in the web application',
        tags: [DocumentationTags.TEACHERS]
    })
    @ApiQuery({
        name: 'category',
        example: 'students',
        required: false,
        description: 'Get teachers'
    })
    @Get('api/v1/teachers')
    async execute(): Promise<FindTeacherResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR>{
        return await this.teacherList.execute();
    }
}