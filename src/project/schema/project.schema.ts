import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

export class Project {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    idOwner: string;

    @Prop({ required: true })
    teams: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
