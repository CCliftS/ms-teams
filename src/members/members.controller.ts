import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersDTO } from './dto/members.dto';
import { TeamsDTO } from 'src/teams/dto/teams.dto';

@Controller('Members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async addTeam(@Body() membersDTO: MembersDTO) {
    return this.membersService.addTeam(membersDTO);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get('GetByEmail')
  findOneByEmail(@Param('email') email: string) {
    return this.membersService.findOneByEmail(email);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }

  @Post('memberData')
  getMemberData(@Param('email') email: string){
    return this.membersService.getMemberData(email);
  }
}
