import { IsNotEmpty, IsString} from "class-validator";

export class MembersDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    role: string;
}