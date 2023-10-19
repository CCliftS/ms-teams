import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsDTO } from './dto/teams.dto';
import { MembersDTO } from 'src/members/dto/members.dto';
import { MembersService } from 'src/members/members.service';


@Controller('Teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService, 
    /*private readonly membersService: MembersService*/) {}
/*
  @Post('create')
  async create(@Body() membersDTO: MembersDTO, teamsDTO: TeamsDTO) {
    return this.teamsService.create(membersDTO,teamsDTO);
  }*/

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch('ChangeName')
  updateName(@Param('name') name: string, @Body() teamsDTO: TeamsDTO) {
    return this.teamsService.updateName(name, teamsDTO);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
/*
  @Post('memberTeam')
  getMemberTeam(@Param('id') id:string){
    return this.membersService.getMemberTeam(id);
  }*/
}
