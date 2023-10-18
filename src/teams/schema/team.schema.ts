import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type TeamsDocument = HydratedDocument<teams>;

@Schema()

export class teams {
    @Prop({ required: true })
    name: string;
}
export const teamsSchema = SchemaFactory.createForClass(teams);