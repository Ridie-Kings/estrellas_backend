import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import * as fs from 'fs';
import * as path from 'path';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Category | null> {
    return this.categoriesService.findOne(slug);
  }

  @Post()
  async create(@Body() category: Category): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Post('import')
  async importCategories(): Promise<Category[]> {
    const jsonPath = path.join(process.cwd(), 'categories.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const categories = JSON.parse(rawData);
    return this.categoriesService.bulkCreate(categories);
  }
}
