import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { teams, teamsSchema } from './schema/team.schema';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [MembersModule,
    MongooseModule.forFeature([{
      name: teams.name,
      schema: teamsSchema,
    }]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService], 
  exports: [TeamsService]
})
export class TeamsModule {}
