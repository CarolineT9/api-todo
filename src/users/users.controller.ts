import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch } from '@nestjs/common';
//Buscar detalhes de um usuario
//Cadastrar usuário
//Deletar usuário
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService){}
  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe)id: number){
    return this.UsersService.findOne(id)
  }
  @Post()
  createUser(@Body() createUserDto: CreateUserDto){
    return this.UsersService.create(createUserDto)
  }
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto: UpdateUserDto){
    return this.UsersService.update(id, updateUserDto)
  }
  

}
