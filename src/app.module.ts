import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
	  ConfigModule.forRoot(),
	  MongooseModule.forRoot(process.env.MONGODB_URI),
	  ArticlesModule,
	  CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
