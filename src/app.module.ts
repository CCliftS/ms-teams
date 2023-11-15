import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { MembersModule } from './members/members.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MembersModule,
    TeamsModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
