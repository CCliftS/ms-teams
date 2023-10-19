import { Injectable } from '@nestjs/common';
import { MembersDTO } from './dto/members.dto';
import { Members } from './schema/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { TeamsDTO } from 'src/teams/dto/teams.dto';

@Injectable()
export class MembersService {
  
  constructor(@InjectModel(Members.name)
    private membersModel: Model<Members>,
    ) {
    }

  async create(membersDTO: MembersDTO): Promise<Members> {
    const createdMember = new this.membersModel(Members);
    return createdMember.save();
  }

  async findAll(): Promise<Members[]> {
    return this.membersModel.find().exec();
  }

  findOne(id: string) {
    return this.membersModel.findOne({ id: id});
  }

  remove(id: string) {
    return this.membersModel.deleteOne({id: id});
  }

  addTeam(membersDTO: MembersDTO, teamsDTO: TeamsDTO) {
    throw new Error('Method not implemented.');
  }

  async getMemberData(email: string) {
    return (await this.membersModel.findOne({email: email})).name;
  }

  // No se si este bueno
  getMemberTeam(id: string) { 
    return this.membersModel.find({idTeam:id});
  }
}
