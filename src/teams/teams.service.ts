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

  async findAll(): Promise<Teams[]> {
    return await this.teamsModel.find().exec();
  }


  async findTeamsByMemberIds(memberIds: string[]): Promise<Teams[]> {
    return await this.teamsModel.find({ members: { $in: memberIds } });
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

  async remove(id: string): Promise<Teams> {
    return await this.teamsModel.findByIdAndDelete({ _id: id });
  }

  async findTeamById(id: string): Promise<Teams> {
    return this.teamsModel.findOne({ _id: id });
  }

}
