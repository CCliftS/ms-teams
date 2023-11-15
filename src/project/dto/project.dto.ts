import { IsNotEmpty, IsString } from "class-validator";

export class ProjectDTO {
    @IsNotEmpty()
    @IsString()
    nameProject: string;

    @IsNotEmpty()
    @IsString()
    idOwner: string;

    @IsNotEmpty()
    teams: string[];
}