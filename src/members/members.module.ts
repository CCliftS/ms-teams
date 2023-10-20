import { Module, forwardRef } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Members, MembersSchema } from './schema/member.schema';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Members.name,
        schema: MembersSchema,
      },
    ]
    ),
    TeamsModule
  ],
  providers: [MembersService],
  controllers: [MembersController],
  exports: [MembersService], // Agrega MembersService a los exports
})
export class MembersModule { }
