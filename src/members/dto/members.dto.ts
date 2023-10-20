import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MembersDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsString()
    idTeam: string
}