import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
  // @IsStrongPassword({
  //   minLength: 6,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minSymbols: 1
  // })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string
}