import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { MembersModule } from './members/members.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';


@Module({
  imports: [
    TeamsModule,
    MembersModule, // Importar MembersModule
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class AppModule { }
