import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './interfaces/article.interface';

@Injectable()
export class ArticlesService {
	constructor(
    		@InjectModel('Article') private readonly articleModel: Model<Article>,
  	) {}

	async findAll(): Promise<Article[]> {
		return this.articleModel.find().exec();
	}
	
	async findOne(slug: string): Promise<Article> {
		return this.articleModel.findOne({ slug }).exec();
	}
	
	async create(article: Article): Promise<Article> {
		const newArticle = new this.articleModel(article);
		return newArticle.save();
	}
	
	async bulkCreate(articles: Article[]): Promise<any> {
		return this.articleModel.insertMany(articles);
	}
}
