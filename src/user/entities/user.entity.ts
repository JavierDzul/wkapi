
import { Role } from "@prisma/client";

export class User {
    
   
    id: string;
    
  
    name: string;

    
    
    email: string;

   
    emailVerified?: string;
    
    
    // @ApiProperty({
    //     description: "Password: Min 6 characters, 1 uppercase, 1 lowercase and 1 number",
    //     nullable: false,
    //     required: true,
    //     type: "string",
    //     example: "Password123",
    // })
    // password?: string;


    
    role: Role;
    
  
    image?: string ;

    
    
  
    createdAt?: Date; 
    
   
    updatedAt?: Date; 
    
}



