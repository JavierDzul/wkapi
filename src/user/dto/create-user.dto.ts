
import { Role } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

import { RegisterUserDto } from "src/auth/dto/register-user.dto";

export class CreateUserDto extends RegisterUserDto {
    
    @IsString()
    @IsOptional()
    role?: Role;

}
