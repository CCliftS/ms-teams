import { Inject, Injectable } from '@nestjs/common';
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
  findAll():Promise<Teams[]> {
    return this.teamsModel.find().exec();
  }


  async findTeamsByMemberIds(memberIds: string[]): Promise<Teams[]> {
    return await this.teamsModel.find({ members: { $in: memberIds } });
  }
  /*
    updateName(name: string, teamsDTO: TeamsDTO) {
      return this.teamsModel.name.replace(teamsDTO, name);
    }
  */
  remove(id: string): Promise<Teams> {
    return this.teamsModel.findByIdAndDelete({ id: id });
  }

  async findTeamById(id: string): Promise<Teams> {
    return this.teamsModel.findOne({ _id: id });
}
}
