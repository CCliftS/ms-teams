import { IsNotEmpty, IsString, Length } from "class-validator";

export class ProjectDTO {
    @IsNotEmpty()
    @IsString()
    nameProject: string;

    @IsNotEmpty()
    @IsString()
    idOwner: string;

    @IsNotEmpty()
    teams: string[];

    @IsNotEmpty()
    @IsString()
    @Length(0, 150)
    description: string;
}