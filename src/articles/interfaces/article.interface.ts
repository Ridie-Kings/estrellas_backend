import { Document } from 'mongoose';

export interface Article extends Document {
  title: string;
  slug: string;
  content: string;
  categories: string;
  date: Date;
}

