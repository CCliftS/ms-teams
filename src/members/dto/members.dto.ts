import { IsNotEmpty, IsString} from "class-validator";

export class MembersDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsString()
    idTeams: string
}