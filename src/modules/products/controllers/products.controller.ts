import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  // private => this arg autamitacally stored in equally named properties
  // readonly => will never replace w new Value
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ): Promise<any> {
    const id = await this.productsService.insertProduct(title, desc, price);

    return { id: id };
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ) {
    return await this.productsService.updateProduct(id, title, desc, price);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    const deleted = await this.productsService.deleteProduct(id);

    return deleted;
  }
}
