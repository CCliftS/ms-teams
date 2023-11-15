import { IsNotEmpty, IsString } from "class-validator";

export class ProjectDTO {
    @IsNotEmpty()
    @IsString()
    nameProject: string;
    
    @IsNotEmpty()
    @IsString()
    idUser: string;

    @IsNotEmpty() 
    @IsString()
    teams: string[];
}