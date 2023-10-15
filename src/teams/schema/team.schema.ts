import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type TeamsDocument = HydratedDocument<Teams>;

@Schema()

export class Teams {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    member_name: string;
}
export const TeamsSchema = SchemaFactory.createForClass(Teams);