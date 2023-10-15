import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsDTO } from './dto/teams.dto';

@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() teamsDTO: TeamsDTO) {
    return this.teamsService.create(teamsDTO);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() teamsDTO: TeamsDTO) {
    return this.teamsService.update(+id, teamsDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
