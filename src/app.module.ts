import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [TeamsModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
