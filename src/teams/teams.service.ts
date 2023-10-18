import { Injectable } from '@nestjs/common';
import { teams } from './schema/team.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TeamsDTO } from './dto/teams.dto';
import { MembersDTO } from 'src/members/dto/members.dto';
import { Model } from 'mongoose';
import { MembersService } from 'src/members/members.service';


@Injectable()
export class TeamsService {

  constructor(@InjectModel(teams.name)
    private teamsModel: Model<teams>,
    private readonly membersService: MembersService
    ) {}
  // crear equipo crea el equipo solo
  async create({email, role}:MembersDTO, teamsDTO: TeamsDTO) {
    const createdTeam = new this.teamsModel(teamsDTO);
    const idTeams = createdTeam.id;
    await this.membersService.create({email,role,idTeams});
    return createdTeam.save();
  }

  findAll() {
    return this.teamsModel.find().exec();
  }

  findOne(id: string) {
    return this.teamsModel.find({id:id});
  }

  updateName(name: string, teamsDTO: TeamsDTO) {
    return this.teamsModel.name.replace(teamsDTO.name,name);
  }

  remove(id: string) {
    return this.teamsModel.deleteOne({id:id});
  }
}
