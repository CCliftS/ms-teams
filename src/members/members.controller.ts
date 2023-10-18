import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersDTO } from './dto/members.dto';
import { TeamsDTO } from 'src/teams/dto/teams.dto';

@Controller('Members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async create(@Body() membersDTO: MembersDTO) {
    return this.membersService.create(membersDTO);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }

  @Post('addteam')
  addTeam(@Param('memberId') membersDTO: MembersDTO, @Param('teamsId') teamsDTO: TeamsDTO){
    return this.membersService.addTeam(membersDTO,teamsDTO);
  }

  @Post('memberData')
  getMemberData(@Param('email') email: string){
    return this.membersService.getMemberData(email);
  }
}
