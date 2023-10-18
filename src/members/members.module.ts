import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { members, membersSchema } from './schema/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: members.name,
      schema: membersSchema,
    }]),
  ],
  providers: [MembersService],
  controllers: [MembersController],
  exports: [MembersService], // Añadir aquí MembersService a los exports
})
export class MembersModule {}
