import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectService } from './project.service';
import { ProjectDTO } from './dto/project.dto';


@Controller('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get('findAllProject')
  findAll() {
    return this.projectService.findAll();
  }

  /* Aqui pido los projects del Owner*/
  @Get('findProjectOwner/:idOwner')
  findProjectOwner(@Param('idOwner') idOwner: string) {
    return this.projectService.findProjectOwner(idOwner);
  }

  /* GET de los proyectos asociados al usuario (No owner) */
  @Get('findAllParticipatedProjects/:email')
  findAllParticipatedProjects(@Param('email') email: string) {
    return this.projectService.findAllParticipatedProjects(email);
  }

  /* Aqui pido los datos del project por id*/
  @Get('findOneProject/:idProject')
  findProjectById(@Param('idProject') idProject: string) {
    return this.projectService.findProjectById(idProject);
  }

  @Post('createProject')
  async create(@Body() projectDTO: ProjectDTO) {
    return this.projectService.create(projectDTO);
  }

  @Post('updateProject')
  update(@Body('id') id: string, @Body('newName') newName: string) {
    return this.projectService.update(id, newName);
  }

  @Post('addTeam')
  addTeam(@Body('id') id: string, @Body('idTeam') idTeam: string) {
    return this.projectService.addTeam(id, idTeam);
  }

  @Delete('removeProject')
  remove(@Payload() id: string) {
    return this.projectService.remove(id);
  }

  @Delete('removeTeam:/id/:idTeam')
  removeTeam(@Param('id') id: string, @Param('idTeam') idTeam: string) {
    return this.projectService.removeTeam(id, idTeam);
  }
}
