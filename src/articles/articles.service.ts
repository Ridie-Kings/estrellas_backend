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

  async findOne(slug: string): Promise<Article | null> {
    return this.articleModel.findOne({ slug }).exec();
  }

  async create(article: Article): Promise<Article> {
    const newArticle = new this.articleModel(article);
    return newArticle.save();
  }

  async bulkCreate(articles: any[]): Promise<Article[]> {
    console.log('Bulk creating articles:', articles);
    
    const formattedArticles = articles.map((article) => ({
      ...article,
      title: article.title,
      content: article.content,
      slug: article.slug,
      categories: article.categories,
      tags: article.tags,
      publishedAt: new Date(article.publishedAt),
      metadata: {
        wordpress_id: article.metadata.wordpress_id,
        status: article.metadata.status,
      },
    }));

    return this.articleModel.insertMany(formattedArticles, { ordered: false });
  }
}
