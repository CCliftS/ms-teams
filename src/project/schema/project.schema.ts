import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;
@Schema()
export class Project {
    @Prop({ required: true })
    nameProject: string;

    @Prop({ required: true })
    idOwner: string;

    @Prop({ type: [String], required: true })
    teams: string[];

    @Prop({ required: false })
    description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
