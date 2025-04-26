import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
  title: String,
  slug: String,
  content: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: { type: Date, default: Date.now },
});

