// src/review/dto/create-review.dto.ts
export class CreateReviewDto {
  productName: string;
  reviewText: string;
  username: string;
  image?: string;
}
