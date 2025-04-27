import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import * as fs from 'fs';
import * as path from 'path';

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
  async importArticles() {
    try {
      const jsonPath = path.join(process.cwd(), 'articles.json');
      const rawData = fs.readFileSync(jsonPath, 'utf-8');
      const articles = JSON.parse(rawData);

      const result = await this.articlesService.bulkCreate(articles);
      return {
        message: 'Importación exitosa',
        insertedCount: result.length,
      };
    } catch (error) {
      console.error('Error en importación:', error);
      throw new InternalServerErrorException('Error al importar artículos');
    }
  }
}
