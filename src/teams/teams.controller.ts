import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsDTO } from './dto/teams.dto';
import { MembersDTO } from 'src/members/dto/members.dto';
import { MembersService } from 'src/members/members.service';


@Controller('Teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService) { }

  @Post('createTeam')
  async createTeam(@Body() teamDTO: TeamsDTO) {
    return this.teamsService.createTeam(teamDTO);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
  @Post()
  async findTeamsByMemberIds(@Body() body: { memberIds: string[] }) {
    const { memberIds } = body;
    const teams = await this.teamsService.findTeamsByMemberIds(memberIds);
    return teams;
  }

  @Post('findTeamById')
  findTeamById(@Body('id') id: string) {
    return this.teamsService.findTeamById(id);
  }
  @Post('updateName')
  updateName(@Body('newName') newName: string, @Body('id') id: string) {
    return this.teamsService.updateName(newName, id);
  }

}
