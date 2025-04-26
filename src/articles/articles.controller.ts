import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';


@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Article | null> {
    return this.articlesService.findOne(slug);
  }

  @Post()
  async create(@Body() article: Article): Promise<Article> {
    return this.articlesService.create(article);
  }

  @Post('import')
  async import(@Body() articles: Article[]): Promise<Article[]> {
    return this.articlesService.bulkCreate(articles);
  }
}
