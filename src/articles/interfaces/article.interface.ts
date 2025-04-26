import { Document } from 'mongoose';

export interface Article extends Document {
  title: string;
  slug: string;
  content: string;
  category: string;
  date: Date;
}

