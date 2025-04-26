import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import fs from 'fs';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Category> {
    return this.categoriesService.findOne(slug);
  }

  @Post()
  async create(@Body() category: Category): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Post('import')
  async importCategories(): Promise<any> {
	  const categories = JSON.parse(fs.readFileSync('categories.json', 'utf-8'));
	  return this.categoriesService.bulkCreate(categories);
  }
}

