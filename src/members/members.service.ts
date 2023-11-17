import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MembersDTO } from './dto/members.dto';
import { Members } from './schema/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { TeamsService } from 'src/teams/teams.service';
import { Teams } from 'src/teams/schema/team.schema';
import axios from 'axios';

const communicateWithUser = async (email: string) => {
  try {
    const response = axios.post(`${process.env.MS_USER}/user/getByMail`, {
      email
    });
  } catch (error) {
    console.log(error);
  }
};


@Injectable()
export class MembersService {

  constructor(
    @InjectModel(Members.name) private membersModel: Model<Members>,
    private readonly teamsService: TeamsService
  ) { }

  async addMemberTeam(membersDTO: MembersDTO): Promise<Members> {

    const teamMembers = await this.getMemberTeamId(membersDTO.idTeam);
    const mm = teamMembers.TeamsEmails;

    if (communicateWithUser && !mm.includes(membersDTO.email)) {
      const member = new this.membersModel(membersDTO);
      return await member.save();
    }
    else {
      throw new HttpException('MEMBER ALREADY ON THE TEAM', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Members[]> {
    return this.membersModel.find().exec();
  }

  async findId(idTeam: string): Promise<Members> {
    return this.membersModel.findOne({ idTeam: idTeam });
  }

  async updateMail(newEmail: string, email: string) {
    return this.membersModel.updateMany({ email: email }, { email: newEmail }, { new: true });
  }

  async removeMember(id: string, idTeam:string): Promise<Members> {
    return await this.membersModel.findOneAndDelete({ _id: id, idTeam:idTeam});
  }

  async updateRole(id: string, role: string) {
    return await this.membersModel.findByIdAndUpdate(id, { role: role }, { new: true });
  }

  async updateTeam(newName: string, idTeam: string) {
    this.teamsService.updateName(newName, idTeam);
    return await this.membersModel.updateMany({ idTeam: idTeam }, { nameTeam: newName }, { new: true });
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

  async findMemberByEmail(email: string, idTeam: string) {
    console.log(idTeam);
    return this.membersModel.findOne({ email: email, idTeam: idTeam });
  }

  async getMemberTeamId(idTeam: string) {
    const member = await this.membersModel.find({ idTeam: idTeam });
    const nameTeam = member.map(member => member.nameTeam);
    const TeamsEmails = member.map(member => member.email);
    return { nameTeam, TeamsEmails };
  }

}
