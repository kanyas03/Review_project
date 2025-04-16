// src/review/review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schema/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  async addReview(
    createReviewDto: CreateReviewDto,
    imageName?: string,
  ): Promise<Review> {
    const newReview = new this.reviewModel({
      ...createReviewDto,
      image: imageName ?? null,
    });
    return newReview.save();
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().sort({ createdAt: -1 }); // newest first
  }

  async getReview(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async updateReview(
    id: string,
    updateData: UpdateReviewDto,
    imageName?: string,
  ): Promise<Review> {
    const review = await this.reviewModel.findById(id);
    if (!review) throw new NotFoundException('Review not found');

    if (imageName) {
      review.image = imageName;
    }

    Object.assign(review, updateData);
    return review.save();
  }

  async deleteReview(id: string): Promise<{ message: string }> {
    const result = await this.reviewModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Review not found');
    return { message: 'Review deleted successfully' };
  }
}
