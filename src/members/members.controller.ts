import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersDTO } from './dto/members.dto';
import { TeamsService } from 'src/teams/teams.service';

@Controller('Member')
export class MembersController {
  constructor(private readonly membersService: MembersService,
  ) { }

  @Post('addMemberTeam')
  async addMemberTeam(@Body() membersDTO: MembersDTO) {
    return this.membersService.addMemberTeam(membersDTO);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Post('findId')
  findId(@Body('idTeam') id: string) {
    return this.membersService.findId(id);
  }

  @Post('updateMail')
  updateMail(@Body('newEmail') newEmail: string, @Body('email') email: string) {
    return this.membersService.updateMail(newEmail, email);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }

  @Post('memberData')
  getMemberData(@Body('email') email: string) {
    return this.membersService.getMemberData(email);
  }

  @Post('findTeamById')
  findTeamById(@Body('id') id: string) {
    return this.membersService.findTeamById(id);
  }
  
  @Get('getMemberTeam/:idTeam')
  getMemberTeamId(@Param('idTeam') idTeam: string) {
    return this.membersService.getMemberTeamId(idTeam);
  }
}
