// src/review/schema/review.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  reviewText: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  image?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
