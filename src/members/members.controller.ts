import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
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

  @Get('findMemberByEmail/:email/:idTeam')
  findMemberById(@Param('email') email: string, @Param('idTeam') idTeam: string) {
    return this.membersService.findMemberByEmail(email, idTeam);
  }

  @Get('getTeamIfAdmin/:email')
  getTeamIfAdmin(@Param('email') email: string) {
    return this.membersService.getTeamIfAdmin(email);
  }

  @Get('getTeamIfMember/:email')
  getTeamIfMember(@Param('email') email: string) {
    return this.membersService.getTeamIfMember(email);
  }

  @Get('findTeamById/:id')
  findTeamById(@Param('id') id: string) {
    return this.membersService.findTeamById(id);
  }

  @Post('findId')
  findId(@Body('idTeam') id: string) {
    return this.membersService.findId(id);
  }

  @Post('addMemberTeam')
  async addMemberTeam(@Body() membersDTO: MembersDTO) {
    return this.membersService.addMemberTeam(membersDTO);
  }

  @Post('memberData')
  getMemberData(@Body('email') email: string) {
    return this.membersService.getMemberData(email);
  }

  @Put('updateTeam/:idTeam')
  updateTeam(@Param('idTeam') idTeam: string, @Body('newName') newName: string) {
    return this.membersService.updateTeam(idTeam, newName);
  }

  @Put('updateMail:/email')
  updateMail(@Body('newEmail') newEmail: string, @Param('email') email: string) {
    return this.membersService.updateMail(newEmail, email);
  }

  @Delete('removeMember/:id/:idTeam')
  remove(@Param('id') id: string, @Param('idTeam') idTeam: string) {
    return this.membersService.removeMember(id, idTeam);
  }
  
}
