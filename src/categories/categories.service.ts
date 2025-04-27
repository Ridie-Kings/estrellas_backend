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

  async findOne(slug: string): Promise<Category | null> {
    return this.categoryModel.findOne({ slug }).exec();
  }

  async create(category: Category): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return newCategory.save();
  }

  async bulkCreate(categories: Category[]): Promise<Category[]> {
    return this.categoryModel.insertMany(categories);
  }

  async update(
    slug: string,
    categoryData: Partial<Category>,
  ): Promise<Category | null> {
    return this.categoryModel
      .findOneAndUpdate({ slug }, categoryData, { new: true })
      .exec();
  }
}
