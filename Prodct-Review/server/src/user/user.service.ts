// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({ ...createUserDto, password: hashedPassword });
    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginUserDto, res: Response): Promise<any> {
    const user = await this.userModel.findOne({ username: loginDto.username });
    if (!user) return { message: 'User not found' };

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) return { message: 'Invalid credentials' };

    const payload = { id: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    res.cookie('review', token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
    };
  }
}
