import { MikroORM } from "@mikro-orm/core";
import { MongoConnection, MongoDriver } from "@mikro-orm/mongodb";
import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { authDTO } from "../../../../api/v1/auth/dto/auth.dto";
import { FindStudentsResponseDTO } from "../../../../api/v1/students/dto/student.dto";
import { MIKRO_ORM_MONGODB_TOKEN } from "../../../../utils/mikro-orm-switcher.module";
import { AuthenticateRepository } from "../../domain/AuthenticateRepository";

@Injectable()
export class AuthenticateRepositoryMikroORM implements AuthenticateRepository{
    private connection: MongoConnection; 
    constructor(@Inject(MIKRO_ORM_MONGODB_TOKEN) private readonly orm: MikroORM<MongoDriver>){
        this.connection = this.orm.em.getDriver().getConnection();
    }
    async findStudent(user: authDTO): Promise<FindStudentsResponseDTO | undefined> {
        try {
            const {email,password} = user;
            const findUser = await this.connection.getCollection('students').findOne({email});
            if(!findUser){
                throw new HttpException('Invalid credentials',HttpStatus.UNAUTHORIZED);
            }
            if(await bcrypt.compare(password,findUser.password)){ 
                findUser['id'] = findUser._id.toString();
                return this.returnUndefinedOrDomainModel(findUser);
            }else{
                throw new HttpException('Invalid credentials',HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            console.log(error);
            throw new HttpException(error,500);
        }
    }
    private returnUndefinedOrDomainModel(studentDTO: FindStudentsResponseDTO | null){
        if(studentDTO) return studentDTO;
    }

}