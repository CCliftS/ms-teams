import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectService } from './project.service';
import { ProjectDTO } from './dto/project.dto';


@Controller('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post('createProject')
  async create(@Body() projectDTO: ProjectDTO) {
    return this.projectService.create(projectDTO);
  }

  @MessagePattern('findAllProject')
  findAll() {
    return this.projectService.findAll();
  }



  @Post('updateProject')
  update(@Body('id') id: string, @Body('newName') newName: string) {
    return this.projectService.update(id, newName);
  }

  @MessagePattern('removeProject')
  remove(@Payload() id: string) {
    return this.projectService.remove(id);
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
}
