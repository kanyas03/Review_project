// src/review/dto/create-review.dto.ts
export class CreateReviewDto {
  productName: string;
  reviewText: string;
  rating: number;
  username: string;
  image?: string; // ✅ Add this line
}
