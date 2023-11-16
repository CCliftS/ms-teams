import { Injectable } from '@nestjs/common';
import { ProjectDTO } from './dto/project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model } from 'mongoose';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly teamsService: TeamsService
  ) { }

  async create(projectDTO: ProjectDTO): Promise<Project> {
    const project = new this.projectModel(projectDTO);
    console.log(project);
    return project.save();
  }

  async addTeam(id: string, idTeam: string): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(id, { $push: { teams: idTeam } }, { new: true }).exec();
  }

  add(id: string, idMember: string): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, { $push: { members: idMember } }, { new: true }).exec();
  }

  findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  findOne(id: string): Promise<Project> {
    return this.projectModel.findOne({ _id: id }).exec();
  }

  update(id: string, projectDTO: ProjectDTO): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, projectDTO, { new: true }).exec();
  }

  remove(id: string): Promise<Project> {
    return this.projectModel.findByIdAndRemove(id).exec();
  }
}
