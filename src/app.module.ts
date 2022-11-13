import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/produtcs.module';

@Module({
  //typically split according to services
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://ajitimur:Ajitimur471@cluster0.17vzm.mongodb.net/nest-demo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController], // literal descrp of controller
  providers: [AppService], //
})
export class AppModule {}

// embrace modularity
