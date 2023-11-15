import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectService } from './project.service';
import { ProjectDTO } from './dto/project.dto';


@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern('createProject')
  create(@Payload() projectDTO: ProjectDTO) {
    return this.projectService.create(projectDTO);
  }

  @MessagePattern('findAllProject')
  findAll() {
    return this.projectService.findAll();
  }

  @MessagePattern('findOneProject')
  findOne(@Payload() id: number) {
    return this.projectService.findOne(id);
  }

  @MessagePattern('updateProject')
  update(@Payload() id:number,projectDTO: ProjectDTO) {
    return this.projectService.update(id, projectDTO);
  }

  @MessagePattern('removeProject')
  remove(@Payload() id: number) {
    return this.projectService.remove(id);
  }
}
