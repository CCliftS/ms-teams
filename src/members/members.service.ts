import { Injectable } from '@nestjs/common';
import { MembersDTO } from './dto/members.dto';
import { Members } from './schema/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'


@Injectable()
export class MembersService {

  constructor(
    @InjectModel(Members.name) private membersModel: Model<Members>,
  ) { }

  async addMemberTeam(membersDTO: MembersDTO) {
    const member = new this.membersModel(membersDTO);
    return await member.save();
  }

  async findAll(): Promise<Members[]> {
    return this.membersModel.find().exec();
  }

  findOneByEmail(email: string) {
    return this.membersModel.findOne({ email: email });
  }

  remove(id: string) {
    return this.membersModel.deleteOne({ id: id });
  }

  async getMemberData(email: string) {
    return (await this.membersModel.findOne({ email: email }));
  }

  getMemberTeam(id: string) {
    return this.membersModel.find({ idTeam: id });
  }
}
