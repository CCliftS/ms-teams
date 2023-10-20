import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersDTO } from './dto/members.dto';

@Controller('Member')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post('addMemberTeam')
  async addMemberTeam(@Body() membersDTO: MembersDTO) {
    return this.membersService.addMemberTeam(membersDTO);
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
  getMemberData(@Param('email') email: string) {
    return this.membersService.getMemberData(email);
  }
}
