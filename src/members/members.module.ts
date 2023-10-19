import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Members, MembersSchema } from './schema/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Members.name,
        schema: MembersSchema,
      },
    ]),
  ],
  providers: [MembersService],
  controllers: [MembersController],
  exports: [MembersService], // Agrega MembersService a los exports
})
export class MembersModule {}
