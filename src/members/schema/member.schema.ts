import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MembersDocument = HydratedDocument<Members>;

@Schema()

export class Members {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required: true })
    idTeam: string;

    @Prop({ required: true })
    nameTeam: string;
}
export const MembersSchema = SchemaFactory.createForClass(Members);