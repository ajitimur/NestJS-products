import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../model/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    // const id = uuid();
    const newProduct = new this.productModel({
      title,
      desc,
      price,
    });
    const res = await newProduct.save();

    return res.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      desc: prod.desc,
      price: prod.price,
    }));
  }

  async getProduct(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('could not find product');
    }
    if (!product) {
      throw new NotFoundException('could not find product');
    }

    return {
      id: product.id,
      title: product.title,
      desc: product.desc,
      price: product.price,
    } as Product;
  }

  async updateProduct(id: string, title: string, desc: string, price: number) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('could not find product');
    }

    if (title) {
      product.title = title;
    }
    if (desc) {
      product.desc = desc;
    }
    if (price) {
      product.price = price;
    }

    product.save();
    return {
      id: product.id,
      title: product.title,
      desc: product.desc,
      price: product.price,
    } as Product;
  }

  async deleteProduct(id: string) {
    const res = await this.productModel.deleteOne({ _id: id }).exec();
    if (res.deletedCount === 0) {
      throw new NotFoundException('Could not find product');
    }
    return { message: 'product deleted' };
  }
}
