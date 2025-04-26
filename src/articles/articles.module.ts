import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticleSchema } from './schemas/article.schema'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
	],
	providers: [ArticlesService],
	controllers: [ArticlesController]
})
export class ArticlesModule {}
