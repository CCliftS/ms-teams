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

  async createTeam(teamsDTO: TeamsDTO) {
    const team = new this.teamsModel(teamsDTO);
    return await team.save();
  }
  findAll() {
    return this.teamsModel.find().exec();
  }

  findOne(id: string) {
    return this.teamsModel.find({ id: id });
  }
  /*
    updateName(name: string, teamsDTO: TeamsDTO) {
      return this.teamsModel.name.replace(teamsDTO, name);
    }
  */
  remove(id: string) {
    return this.teamsModel.deleteOne({ id: id });
  }
}
