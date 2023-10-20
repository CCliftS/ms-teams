import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teams, TeamsSchema } from './schema/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teams.name,
        schema: TeamsSchema,
      },
    ])
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule { }