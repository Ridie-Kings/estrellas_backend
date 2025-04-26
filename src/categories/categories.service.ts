import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(slug: string): Promise<Category> {
    return this.categoryModel.findOne({ slug }).exec();
  }

  async create(category: Category): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return newCategory.save();
  }

  async bulkCreate(categories: Category[]): Promise<any> {
	  return this.categoryModel.insertMany(categories);
  }
}

