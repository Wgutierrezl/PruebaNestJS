import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
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
         Controller, 
         UseGuards,
         Req} 
from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/getProfile')
  @ApiOperation({summary:'get user profile'})
  @ApiResponse({status : 200 , description: 'profile found'})
  @ApiResponse({status : 401 , description : 'you dont authorice'})
  async getUserProfile(@Req() req){
    try{
      if(!req.user.id){
        return {
          message:'invalid token'
        }
      }

      const response=await this.usersService.getUserProfile(req.user.id)

      if(!response || response==null){
        return {
          message:'we cant check you profile'
        }
      }

      return response


    }catch(error:any){
      return {
        message:`error : ${error.message}`
      }

    }

  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Get('/getAllUsers')
  @ApiOperation({summary:'get all users'})
  @ApiResponse({status : 200 , description: 'users found'})
  @ApiResponse({status : 401 , description : 'you dont authorice'})
  async getAllUsers(@Req() req){
    try{
      if(!req.user.id){
        return {
          message:'invalid token'
        }
      }

      const response=await this.usersService.getAll()

      if(!response || response.length===0){
        return {
          message:'we cant find any user'
        }
      }

      return response

    }catch(error:any){
      return {
        message:`error ${error.message}`
      }
    }
  }
}





