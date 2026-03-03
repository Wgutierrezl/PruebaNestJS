import { Body, Controller, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { IOrdersService } from './interface/orders.service.interface';
import { Post,Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ORDERS_SERVICE } from './interface/orders.token';
import { CreateOrderDTO } from './dto/orderCreate.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE)
    private readonly _service:IOrdersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('createOrder')
  @ApiOperation({summary:'Endpoint para crear una orden'})
  @ApiResponse({status:201, description: 'orden creada'})
  @ApiResponse({status: 400, description:'error al crear orden'})
  @ApiResponse({status:401, description:'no estas autenticado'})
  @ApiBearerAuth()
  async createOrder(@Body() body:CreateOrderDTO, @Req() req){
    try{
      if(!req.user){
        return {
          message:'no estas autenticado para realizar la accion'
        } 

      }

      const orderCreated=await this._service.createOrder(body, req.user.id);
      if(!orderCreated){
        return {
          message:'no hemos logrado crear la orden'
        }
      }

      return orderCreated

    }catch(error:any){
      return {
        message:`ha ocurrido un error inesperado ${error.message}`
      }
    }
    
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('getOrderById/:id')
  @Roles('admin')
  @ApiOperation({summary:'endpoint para obtener orden por id'})
  @ApiResponse({status:200, description:'orden obtenida'})
  @ApiResponse({status:404, description:'no existe la orden que buscas'})
  @ApiResponse({status:403, description:'no tienes los permisos para realizar esta accion'})
  @ApiResponse({status:401, description:'no estas autenticado'})
  @ApiBearerAuth()
  async getOrderById(@Param('id') id:number){
    try{
      const order=await this._service.getOrderById(id)
      if(!order){
        return {
          message:'no existe la orden que buscas'
        }
      }

      return order

    }catch(error:any){
      return {
        message:`ha ocurrido un error inesperado ${error.message}`
      }
    }

  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('getMyOrders/')
  @ApiOperation({summary:'endpoint para obtener todas mis ordenes'})
  @ApiResponse({status:200, description:'ordenes obtenidas'})
  @ApiResponse({status:404, description:'aun no tienes ordenes creadas'})
  @ApiResponse({status:401, description:'no estas autenticado'})
  @ApiBearerAuth()
  async getMyOrders(@Req() req){
    try{
      if(!req.user){
        return {
          message:'no estas autenticado para realizar la accion'
        }
      }

      const orders=await this._service.getOrderByUserId(req.user.id)
      if(!orders || orders.length===0){
        return {
          message:'aun no tienes ordenes creadas'
        }
      }

      return orders

    }catch(error:any){
      return {
        message:`ha ocurrido un error inesperado ${error.message}`
      }
    }
  }




}
