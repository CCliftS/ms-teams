import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersDTO } from './dto/members.dto';
import { TeamsService } from 'src/teams/teams.service';

@Controller('Member')
export class MembersController {
  constructor(private readonly membersService: MembersService,
  ) { }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get('getMemberTeam/:idTeam')
  getMemberTeamId(@Param('idTeam') idTeam: string) {
    return this.membersService.getMemberTeamId(idTeam);
  }

  @Post('findId')
  findId(@Body('idTeam') id: string) {
    return this.membersService.findId(id);
  }

  @Post('updateMail')
  updateMail(@Body('newEmail') newEmail: string, @Body('email') email: string) {
    return this.membersService.updateMail(newEmail, email);
  }

  @Post('addMemberTeam')
  async addMemberTeam(@Body() membersDTO: MembersDTO) {
    return this.membersService.addMemberTeam(membersDTO);
  }

  @Post('memberData')
  getMemberData(@Body('email') email: string) {
    return this.membersService.getMemberData(email);
  }

  @Get('findMemberByEmail/:email/:idTeam')
  findMemberById(@Param('email') email: string, @Param('idTeam') idTeam: string) {
    return this.membersService.findMemberByEmail(email, idTeam);
  }

  @Post('findTeamById')
  findTeamById(@Body('id') id: string) {
    return this.membersService.findTeamById(id);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
