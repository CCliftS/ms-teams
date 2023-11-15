import { Injectable } from '@nestjs/common';
import { MembersDTO } from './dto/members.dto';
import { Members } from './schema/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { TeamsService } from 'src/teams/teams.service';
import { Teams } from 'src/teams/schema/team.schema';


@Injectable()
export class MembersService {

  constructor(
    @InjectModel(Members.name) private membersModel: Model<Members>,
    private readonly teamsService: TeamsService
  ) { }

  async addMemberTeam(membersDTO: MembersDTO): Promise<Members> {
    const member = new this.membersModel(membersDTO);
    return await member.save();
  }

  async findAll(): Promise<Members[]> {
    return this.membersModel.find().exec();
  }

  async findId(idTeam: string): Promise<Members> {
    return this.membersModel.findOne({ idTeam: idTeam });
  }

  async updateMail(newEmail:string,email: string) {
    return this.membersModel.updateMany({email:email},{email:newEmail}, {new: true});
  }

  async remove(id: string): Promise<Members> {
    return await this.membersModel.findByIdAndRemove({ id: id });
  }

  async updateRole(id: string, role: string) {
    return await this.membersModel.findByIdAndUpdate(id, { role: role }, { new: true });
  }

  async getMemberData(email: string) {
    const members = await this.membersModel.find({ email: email });
    const teamsName = members.map(members => members.nameTeam);
    const teamsId = members.map(members => members.idTeam);
    return { teamsName, teamsId };
  }

  async getMemberTeam(id: string): Promise<Members[]> {
    return this.membersModel.find({ idTeam: id });
  }

  async findTeamById(id: string): Promise<Teams> {
    return this.teamsService.findTeamById(id);
  }

  async findMemberById(id: string): Promise<Members> {
    return this.membersModel.findOne({ _id: id });
  }

  async getMemberTeamId(idTeam: string) {
    const member = await this.membersModel.find({ idTeam: idTeam });
    const nameTeam = member.map(member => member.nameTeam);
    const TeamsEmails = member.map(member => member.email);
    return { nameTeam, TeamsEmails };
  }
}
