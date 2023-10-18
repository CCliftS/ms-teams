import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type MembersDocument = HydratedDocument<members>;

@Schema()

export class members {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required:true })
    idTeam: string;
}
export const membersSchema = SchemaFactory.createForClass(members);