import { applyDecorators, HttpCode } from "@nestjs/common";
import { ApiResponse as NestApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseOptions } from "@nestjs/swagger/dist/decorators/api-response.decorator";

export enum DocumentationTags {
    META = 'Meta',
    STUDENTS = '[App] Students',
    TEACHERS = '[App] Teachers',
    STUDENTSPERTEACHERS = '[App] Students Per Teachers'
};

export type Options = {
    tags: DocumentationTags[];
};

export function Endpoint(options: ApiResponseOptions & Options) {
    if(options.status && typeof options.status === 'number') {
        return applyDecorators(
            NestApiResponse(options),
            HttpCode(options.status),
            ApiTags(...options.tags)
        );
    }

    return applyDecorators(
        NestApiResponse(options),
        ApiTags(...options.tags)
    );
}