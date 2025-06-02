

import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, NotContains } from "class-validator";


export class RegisterUserDto {

    
    @IsString()
    @MinLength(3)
    name: string;

    
   
    @IsEmail()
    email: string;
    
    
   
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least one uppercase, one lowercase and one number',
    })
    @NotContains(' ', { message: 'El password no debe contener espacios' }) 
    password: string;
    
   
    @IsString()
    passwordconf: string;
    

  
    @IsString()
    @IsOptional()
    
    image: string | null;
    

}
