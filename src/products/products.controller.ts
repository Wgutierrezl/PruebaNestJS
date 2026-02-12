import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { IProductService } from './interfaces/product-service.interface';
import { Body, 
         Post, 
         Get, 
         Put, 
         Delete, 
         Param, 
         HttpCode, 
         HttpStatus, 
         HttpException, 
         UseGuards,
         Req} 
from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/product-create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/createProduct')
  @ApiOperation({summary:'Endpoint para crear un producto'})
  @ApiResponse({status:201, description: 'producto creado'})
  @ApiResponse({status: 400, description:'error al crear el producto'})
  @ApiResponse({status:401, description:'no estas autenticado'})
  @ApiBearerAuth()
  async createProduct(@Body() body:CreateProductDTO, @Req() req) {
    try{

      if(!req.user){
        return {
          message:'no estas autenticado para realizar la accion'
        }
      }

      const response=await this.productsService.createProduct(body, req.user.id)

      if(!response){
        return {
          message:'no hemos logrado crear el producto'
        }
      }

      return response

    }catch(error:any){
      return {
        message:`ha ocurrido un error inesperado ${error.message}`
      }

    }

  }


  @UseGuards(JwtAuthGuard)
  @Get('/getMyProducts')
  @ApiOperation({summary:'endpoint para obtener todos mis productos'})
  @ApiResponse({status:200 , description:'productos encontrados'})
  @ApiResponse({status:404, description: 'aun no tienes productos creados'})
  @ApiResponse({status:401, description: 'no estas autenticado'})
  @ApiBearerAuth()
  async getMyProducts(@Req() req) {
    try{

      if(!req.user){
        return {
          message:'no estas autenticado para realizar la accion'
        }
      }
      
      const products=await this.productsService.getProductsByUserId(req.user.id)

      if(!products){
        return {
          message:'aun no tienes productos creados'
        }
      }

      return products

    }catch(error:any){
      return {
        message:`ha ocurrido un error inesperado ${error.message}`
      }
    }
  }
}
