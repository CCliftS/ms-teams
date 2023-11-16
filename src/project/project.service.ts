import { Injectable } from '@nestjs/common';
import { ProjectDTO } from './dto/project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model } from 'mongoose';
import { TeamsService } from 'src/teams/teams.service';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly teamsService: TeamsService,
    private readonly membersService: MembersService
  ) { }

  async create(projectDTO: ProjectDTO): Promise<Project> {
    const project = new this.projectModel(projectDTO);
    console.log(project);
    return project.save();
  }

  async addTeam(id: string, idTeam: string): Promise<Project> {
    const team = this.teamsService.findTeamById(idTeam)
    if (!team) {
      return await this.projectModel.findByIdAndUpdate(id, { $push: { teams: idTeam } }, { new: true }).exec();
    }
  }

  async add(id: string, idMember: string): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(id, { $push: { members: idMember } }, { new: true }).exec();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectModel.findOne({ _id: id }).exec();
  }

  async update(id: string, projectDTO: ProjectDTO): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(id, projectDTO, { new: true }).exec();
  }

  async remove(id: string): Promise<Project> {
    return await this.projectModel.findByIdAndRemove(id).exec();
  }

  /* Aqui pido los projects del Owner*/

  async findProjectOwner(idOwner: string) {
    const project = await this.projectModel.find({ idOwner: idOwner });
    const nameProjects = project.map(project => project.nameProject);
    const idProjects = project.map(project => project._id);
    const teamProjects = project.map(project => project.teams);
    return { nameProjects, idProjects, teamProjects };
  }

  /* GET de los proyectos asociados al usuario (No owner) */

  async findAllParticipatedProjects(email: string) {
    const teamsData = await this.membersService.getMemberData(email);
    const teamsMember = teamsData.teamsId;
    const projects = await this.projectModel.find({ teams: { $in: teamsMember } });
    const participesProjects = projects.map(projects => projects.nameProject);
    const idParticipesProjects = projects.map(projects => projects._id);
    return { participesProjects, idParticipesProjects };
  }

}
