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

  @MessagePattern('findOneProject')
  findOne(@Payload() id: string) {
    return this.projectService.findOne(id);
  }

  @MessagePattern('updateProject')
  update(@Payload() id: string, projectDTO: ProjectDTO) {
    return this.projectService.update(id, projectDTO);
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
}
