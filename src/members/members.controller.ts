import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersDTO } from './dto/members.dto';
import { TeamsDTO } from 'src/teams/dto/teams.dto';

@Controller('Member')
export class MembersController {
  constructor(private readonly membersService: MembersService,
  ) { }

  @Post('createTeam')
  createTeam(@Body() membersDTO: MembersDTO, @Body() teamsDto: TeamsDTO){
    return this.membersService.createTeam(membersDTO,teamsDto);
  }

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

  @Get('findId/:idTeam')
  findId(@Param('idTeam') id: string) {
    return this.membersService.findId(id);
  }

  @Get('getMemberByEmailAndTeam/:email/:idTeam')
  getMemberByEmailAndTeam(@Param('email') email: string, @Param('idTeam') idTeam: string) {
    return this.membersService.getMemberByEmailAndTeam(email, idTeam);
  }

  @Get('getIfAdmin/:email')
  getIfAdmin(@Param('email') email: string) {
    return this.membersService.getIfAdmin(email);
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

  @Put('updateRole/:email/:idTeam')
  updateRole(@Param('email') email: string, @Param('idTeam') idTeam:string, @Body('role') role: string) {
    return this.membersService.updateRole(email,idTeam,role);
  }

  @Put('updateMail/:email')
  updateMail(@Body('newEmail') newEmail: string, @Param('email') email: string) {
    return this.membersService.updateMail(newEmail, email);
  }

  @Delete('removeMember/:id/:idTeam')
  remove(@Param('id') id: string, @Param('idTeam') idTeam: string) {
    return this.membersService.removeMember(id, idTeam);
  }
  
  @Delete('deleteAcount/:email')
  deleteAcount(@Param('email') email: string) {
    return this.membersService.deleteAcount(email);
  }

  @Delete('deleteTeam/:idTeam')
  deleteTeam(@Param('idTeam') idTeam: string) {
    return this.membersService.deleteTeam(idTeam);
  }
}
