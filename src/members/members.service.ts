import { Injectable } from '@nestjs/common';
import { MembersDTO } from './dto/members.dto';
import { Members } from './schema/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Teams } from 'src/teams/schema/team.schema';
import { TeamsService } from 'src/teams/teams.service';


@Injectable()
export class MembersService {

  constructor(
    @InjectModel(Members.name) private membersModel: Model<Members>,
    private readonly teamsService: TeamsService
  ) { }

  async addMemberTeam(membersDTO: MembersDTO) {
    const member = new this.membersModel(membersDTO);
    return await member.save();
  }

  async findAll(): Promise<Members[]> {
    return this.membersModel.find().exec();
  }

  async findId(idTeam: string) {
    return this.membersModel.findOne({ idTeam: idTeam });
  }

  remove(id: string) {
    return this.membersModel.deleteOne({ id: id });
  }


  async getMemberData(email: string) {
    const members = await this.membersModel.find({ email: email });
    const teamsName = members.map(members => members.nameTeam);
    const teamsId = members.map(members => members.idTeam);
    console.log(teamsName, teamsId);
    return { teamsName, teamsId };
  }

  async getMemberTeam(id: string) {
    return this.membersModel.find({ idTeam: id });
  }

  async findTeamById(id: string) {
    return this.teamsService.findTeamById(id);
  }
}
