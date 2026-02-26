import { Controller } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';

@Controller('orderdetails')
export class OrderdetailsController {
  constructor(private readonly orderdetailsService: OrderdetailsService) {}
}
