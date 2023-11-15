import { IsNotEmpty, IsString } from "class-validator";

export class TeamsDTO {
    @IsNotEmpty()
    @IsString()
    nameTeam: string;
}