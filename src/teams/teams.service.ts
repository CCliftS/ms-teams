import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Teams } from './schema/team.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TeamsDTO } from './dto/teams.dto';
import { Model } from 'mongoose';



@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Teams.name) private teamsModel: Model<Teams>,
  ) { }

  async createTeam(teamsDTO: TeamsDTO): Promise<Teams> {
    const team = new this.teamsModel(teamsDTO);
    return await team.save();
  }

  async updateName(newName: string, id: string): Promise<Teams> {
    const team = await this.teamsModel.findById({ _id: id });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    team.nameTeam = newName;
    await team.save();
    return team;
  }

  async getTeamsNamesByIds(teamsIds: string[]): Promise<string[]> {
    const teams = await this.teamsModel.find({ _id: { $in: teamsIds } });
    return teams.map(team => team.nameTeam);
  }

  async findTeamById(id: string): Promise<Teams> {
    return this.teamsModel.findOne({ _id: id });
  }

  async findAll(): Promise<Teams[]> {
    return await this.teamsModel.find().exec();
  }

  async findTeamsByIds(ids: string[]): Promise<Teams[]> {
    return await this.teamsModel.find({ _id: { $in: ids } });
  }

  async findTeamsByMemberIds(memberIds: string[]): Promise<Teams[]> {
    return await this.teamsModel.find({ members: { $in: memberIds } });
  }
  
  async remove(id: string): Promise<void> {
    await this.teamsModel.findByIdAndDelete({ _id: id });
  }
}
