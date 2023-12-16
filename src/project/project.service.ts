import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDTO } from './dto/project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model } from 'mongoose';
import { TeamsService } from 'src/teams/teams.service';
import { MembersService } from 'src/members/members.service';
import { ObjectId } from 'mongodb';
import axios from 'axios';

const deleteTeamTasks = async (idTeam: string) => {
  try {
    const response = await axios.delete(`${process.env.MS_TASK}/Tasks/deleteTeamTasks/${idTeam}`);
  } catch (error) {
    console.log(error);
  }
}


@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly teamsService: TeamsService,
    private readonly membersService: MembersService
  ) { }

  async create(projectDTO: ProjectDTO): Promise<Project> {
    const project = new this.projectModel(projectDTO);
    return project.save();
  }

  async addTeam(id: string, idTeam: string): Promise<Project> {
    const team = await this.teamsService.findTeamById(idTeam)
    const teamsProject = await this.findProjectById(id);
    if (team && !teamsProject.teamProjects.includes(idTeam)) {
      return await this.projectModel.findByIdAndUpdate(id, { $push: { teams: idTeam } }, { new: true }).exec();
    }
  }

  async add(id: string, idMember: string): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(id, { $push: { members: idMember } }, { new: true }).exec();
  }

  async update(id: string, newName: string): Promise<Project> {
    const project = await this.projectModel.findById({ _id: id });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    project.nameProject = newName;
    await project.save();
    return project;
  }

  async updateDescription(id: string, newDescription: string): Promise<Project> {
    const project = await this.projectModel.findById({ _id: id });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    project.description = newDescription;
    await project.save();
    return project;
  }

  /* Aqui pido los projects del Owner*/

  async findProjectOwner(idOwner: string): Promise<{nameProjects: string[], idProjects: ObjectId[], teamProjects: string[][]}> {
    const project = await this.projectModel.find({ idOwner: idOwner });
    const nameProjects = project.map(project => project.nameProject);
    const idProjects = project.map(project => project._id);
    const teamProjects = project.map(project => project.teams);
    return { nameProjects, idProjects, teamProjects };
  }

  /* GET de los proyectos asociados al usuario (No owner) */

  async findAllParticipatedProjects(email: string): Promise<{participedProjects: string[], idParticipedProjects: ObjectId[]}> {
    const teamsData = await this.membersService.getMemberData(email);
    const teamsId = teamsData.teamsId;
    const projects = await this.projectModel.find({ teams: { $in: teamsId } });
    const filtredprojects = projects.filter(projects => projects.idOwner !== email);
    const participedProjects = filtredprojects.map(filtredprojects => filtredprojects.nameProject);
    const idParticipedProjects = filtredprojects.map(filtredprojects => filtredprojects._id);
    return { participedProjects, idParticipedProjects };
  }

  /* Aqui pido los datos del project por id*/
  async findProjectById(idProject: string): Promise<{ nameProject: string, teamProjects: string[], teamsNames: string[] }> {
    const project = await this.projectModel.findById(idProject);
    const nameProject = project.nameProject;
    const teamProjects = project.teams;
    const teamsNames = await this.teamsService.getTeamsNamesByIds(teamProjects);
    return { nameProject, teamProjects, teamsNames };
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().exec();
  }

  async removeTeam(id: string, idTeam: string): Promise<Project> {
    const project = await this.projectModel.findById(id);
    if(project.teams.includes(idTeam)){
      await deleteTeamTasks(idTeam);
      return await this.projectModel.findByIdAndUpdate(id, { $pull: { teams: idTeam } }, { new: true }).exec();
    }
  }

  async removeProject(id: string): Promise<void> {
    const project = this.projectModel.findById(id);
    console.log(id);
    if((await project).teams.length == 0){
      console.log("PROYECTO ELIMINADO");
      (await this.projectModel.findByIdAndRemove(id).exec()).save();
    }
    else{
      console.log("ERROR");
      throw new NotFoundException(`Elimine a los equipos para eliminar el proyecto`);
    }
  }
}
