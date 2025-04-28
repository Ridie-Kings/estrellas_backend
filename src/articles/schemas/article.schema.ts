import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
  title: String,
  slug: String,
  content: String,
  categories: String,
  date: { type: Date, default: Date.now },
});

