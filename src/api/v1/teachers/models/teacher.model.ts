import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Teacher{
    @Prop()
    id: string;
    @Prop({ required: true })
    name: string;
}

export type TeacherDocument = Teacher & Document;

export const TeacherSchema = SchemaFactory.createForClass(Teacher);