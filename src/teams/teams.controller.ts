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

  @Post()
  async findTeamsByMemberIds(@Body() body: { memberIds: string[] }) {
    const { memberIds } = body;
    const teams = await this.teamsService.findTeamsByMemberIds(memberIds);
    return teams;
  }

  @Get('findTeamById/:id')
  findTeamById(@Param('id') id: string) {
    return this.teamsService.findTeamById(id);
  }

  @Get('findTeamsByIds/:ids')
  async findTeamsByIds(@Param('ids') ids: string) {
    const idArray = ids.split(',')
    const teams = await this.teamsService.findTeamsByIds(idArray);
    return teams;
  }

  @Put('updateName/:id')
  updateName(@Body('newName') newName: string, @Param('id') id: string) {
    return this.teamsService.updateName(newName, id);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }

}
