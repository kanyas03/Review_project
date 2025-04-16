// import {
//     Controller,
//     Post,
//     Get,
//     Put,
//     Delete,
//     Body,
//     Param,
//     UploadedFile,
//     UseInterceptors,
//   } from '@nestjs/common';
//   import { FileInterceptor } from '@nestjs/platform-express';
//   import { diskStorage } from 'multer';
//   import { extname } from 'path';
//   import { ReviewService } from './review.service';
//   import { CreateReviewDto } from './dto/create-review.dto';
//   import { UpdateReviewDto } from './dto/update-review.dto';
  
//   @Controller('reviews')
//   export class ReviewController {
//     constructor(private readonly reviewService: ReviewService) {}
  
//     @Post()
//     @UseInterceptors(
//       FileInterceptor('image', {
//         storage: diskStorage({
//           destination: './uploads',
//           filename: (req, file, cb) => {
//             const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
//             cb(null, `${file.fieldname}-${uniqueName}${extname(file.originalname)}`);
//           },
//         }),
//       }),
//     )
//     async addReview(
//       @Body() createReviewDto: CreateReviewDto,
//       @UploadedFile() file: Express.Multer.File,
//     ) {
//       return this.reviewService.addReview(createReviewDto, file?.filename);
//     }
  
//     @Put(':id')
//     @UseInterceptors(
//       FileInterceptor('image', {
//         storage: diskStorage({
//           destination: './uploads',
//           filename: (req, file, cb) => {
//             const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
//             cb(null, `${file.fieldname}-${uniqueName}${extname(file.originalname)}`);
//           },
//         }),
//       }),
//     )
//     async updateReview(
//       @Param('id') id: string,
//       @Body() updateReviewDto: UpdateReviewDto,
//       @UploadedFile() file: Express.Multer.File,
//     ) {
//       return this.reviewService.updateReview(id, updateReviewDto, file?.filename);
//     }
  
//     @Delete(':id')
//     async deleteReview(@Param('id') id: string) {
//       return this.reviewService.deleteReview(id);
//     }
  
//     @Get(':id')
//     async getReview(@Param('id') id: string) {
//       return this.reviewService.getReview(id);
//     }
  
//     @Get()
//     async getAllReviews() {
//       return this.reviewService.getAllReviews();
//     }
//   }
  

import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async addReview(
    @Body() body: CreateReviewDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.reviewService.addReview(body, file?.filename);
  }
}
