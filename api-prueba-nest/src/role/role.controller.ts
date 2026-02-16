import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import type { IRoleService } from './interface/role-service.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDTO } from './dto/create-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ROLE_SERVICE } from './interface/roles.tokens';

@Controller('role')
export class RoleController {
  constructor(
    @Inject(ROLE_SERVICE)
    private readonly roleService:IRoleService
  ) {}

  /* @UseGuards(JwtAuthGuard) */
  @Post('/createRole')
  @ApiOperation({summary:'create role'})
  @ApiResponse({status:201, description:'role created'})
  @ApiResponse({status:400, description:'error creating role'})
  @ApiResponse({status:500, description:'internal server error'})
  @ApiResponse({status:401, description:'unauthorized'})
  /* @ApiBearerAuth() */
  async createRole(@Body() data:CreateRoleDTO){
    try{
      const response=await this.roleService.createRole(data)

      if(!response){
        return {
          message:'could not create role'
        }
      }

      return response

    }catch(error:any){
      return {
        message:`unexpected error: ${error.message}`
      }

    }

  }

  @Get('/getAllRoles')
  @ApiOperation({summary:'get all roles'})
  @ApiResponse({status:200, description:'roles retrieved'})
  @ApiResponse({status:400, description:'error retrieving roles'})
  @ApiResponse({status:500, description:'internal server error'})
  async getAllRoles(){
    try{
      const response=await this.roleService.getAllRoles()

      if(!response){
        return {
          message:'no roles found'
        }
      }

      return response

    }catch(error:any){
      return {
        message:`unexpected error: ${error.message}`
      }

    }
  }
 
  @Get('/getRoleById/:id')
  @ApiOperation({summary:'get role by id'})
  @ApiResponse({status:200, description:'role retrieved'})
  @ApiResponse({status:400, description:'error retrieving role by id'})
  @ApiResponse({status:500, description:'internal server error'})
  async getRoleById(@Param('id') id:number){
    try{
      const response=await this.roleService.getRoleById(id)

      if(!response){
        return {
          message:'role not found with that id'
        }
      }
      return response

    }catch(error:any){
      return {
        message:`unexpected error: ${error.message}`
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteRoleById/:id')
  @ApiOperation({summary:'delete role by id'})
  @ApiResponse({status:200, description:'role deleted'})
  @ApiResponse({status:400, description:'error deleting role by id'})
  @ApiResponse({status:500, description:'internal server error'})
  @ApiBearerAuth()
  async deleteRole(@Param('id') id:number){
    try{
      const response=await this.roleService.deleteRole(id)

      if(!response){
        return {
          message:'role not deleted'
        }
      }

      return {
        message:'role deleted successfully'
      }

    }catch(error:any){
      return {
        message:`unexpected error: ${error.message}`
      }
    }
  }
}
