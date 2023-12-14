import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MembersDTO } from './dto/members.dto';
import { Members } from './schema/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { TeamsService } from 'src/teams/teams.service';
import { Teams } from 'src/teams/schema/team.schema';
import axios from 'axios';
import { ObjectId, UpdateResult } from 'mongodb';

const communicateWithUser = async (email: string) => {
  try {
    const response = axios.get(`${process.env.MS_USER}/user/getByMail/${email}`);
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


  async updateMail(newEmail: string, email: string): Promise<UpdateResult> {
    return this.membersModel.updateMany({ email: email }, { email: newEmail }, { new: true });
  }


  async updateRole(email: string, idTeam:string, role: string): Promise<Members> {
    return await this.membersModel.findOneAndUpdate({email: email, idTeam: idTeam}, { role: role }, { new: true });
  }


  async updateTeam(newName: string, idTeam: string): Promise<UpdateResult> {
    this.teamsService.updateName(newName, idTeam);
    return await this.membersModel.updateMany({ idTeam: idTeam }, { nameTeam: newName }, { new: true });
  }

  async getMemberData(email: string): Promise<{ teamsName: string[], teamsId: string[] }> {
    const members = await this.membersModel.find({ email: email });
    const teamsName = members.map(members => members.nameTeam);
    const teamsId = members.map(members => members.idTeam);
    return { teamsName, teamsId };
  }

  async getMemberTeam(id: string): Promise<Members[]> {
    return this.membersModel.find({ idTeam: id });
  }

  async getMemberTeamId(idTeam: string): Promise<{ nameTeam: string[], TeamsEmails: string[], nameId: ObjectId[], memberRole: string[] }> {
    const member = await this.membersModel.find({ idTeam: idTeam });
    const nameTeam = member.map(member => member.nameTeam);
    const nameId = member.map(member => member._id);
    const memberRole = member.map(member => member.role);
    const TeamsEmails = member.map(member => member.email);
    return { nameTeam, TeamsEmails, nameId, memberRole };
  }

  async getTeamIfAdmin(email: string): Promise<{ teams: string[], teamsId: string[] }> {
    const members = await this.membersModel.find({ email: email });
    const teams = new Array();
    const teamsId = new Array();

    (members).map(member => {
      if (member.role === 'administrador') {
        teams.push(member.nameTeam);
        teamsId.push(member.idTeam);
      }
    });
    return { teams, teamsId };
  }

  async getTeamIfMember(email: string): Promise<{ teams: string[], teamsId: string[] }> {
    const members = await this.membersModel.find({ email: email });
    const teams = new Array();
    const teamsId = new Array();
    (members).map(member => {
      if (member.role != 'administrador') {
        teams.push(member.nameTeam);
        teamsId.push(member.idTeam);
      }
    });
    return { teams, teamsId };
  }

  async getTeamRole(email: string, idTeam: string): Promise<string> {
    const member = await this.membersModel.findOne({ email: email, idTeam: idTeam });
    return member.role;
  }

  async findTeamById(id: string): Promise<Teams> {
    return this.teamsService.findTeamById(id);
  }

  async findMemberByEmail(email: string, idTeam: string): Promise<Members> {
    return this.membersModel.findOne({ email: email, idTeam: idTeam });
  }

  async findAll(): Promise<Members[]> {
    return this.membersModel.find().exec();
  }

  async findId(idTeam: string): Promise<Members> {
    return this.membersModel.findOne({ idTeam: idTeam });
  }

  async removeMember(email: string, idTeam: string): Promise<Members> {
    return await this.membersModel.findOneAndDelete({ email: email, idTeam: idTeam });
  }

  async getMemberByEmailAndTeam(email: string, idTeam: string): Promise<Members> {
    return await this.membersModel.findOne({ email: email, idTeam: idTeam });
  }
}
