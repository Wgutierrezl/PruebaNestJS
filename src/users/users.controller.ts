import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { Body, 
         Post, 
         Get, 
         Put, 
         Delete, 
         Param, 
         HttpCode, 
         HttpStatus, 
         HttpException, 
         Controller } 
from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiOperation({summary:'register user'})
  @ApiResponse({ status : 201, description : 'user created'})
  @ApiResponse({ status : 400, description : 'invalid user'})
  async register(@Body() body:CreateUserDTO){
    try{
      const user=await this.usersService.registerUser(body)

      if(!user){
        return {
          message:'User could not be created'
        }
      }

      return user

    }catch(error:any){
      return {
        message:`error ${error.message}`
      }

    }
  }

  @Post('/login')
  @ApiOperation({summary:'log user'})
  @ApiResponse({ status : 200, description : 'successful login'})
  @ApiResponse({ status : 400, description : 'email or password wrongs'})
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() data:LoginDTO){
    try{
      const logUser=await this.usersService.loginUser(data)

      if(!logUser || logUser==null){
        return {
          message:'email or password incorrect'
        }

      }

      return logUser

    }catch(error:any){
      return {
        message:`error ${error.message}`
      }
    }
  }
}



