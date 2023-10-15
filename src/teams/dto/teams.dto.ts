import { IsNotEmpty, IsString} from "class-validator";

export class TeamsDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    member_name: string;
}